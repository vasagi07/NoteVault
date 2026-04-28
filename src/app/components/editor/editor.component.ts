import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, debounceTime } from 'rxjs';
import { Note } from '../../models/note.model';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="editor-container">
      <div class="editor-header">
        <input 
          type="text" 
          class="title-input" 
          placeholder="Note title..." 
          [(ngModel)]="noteTitle"
          (ngModelChange)="onTitleChange()"
        />
        <div class="editor-actions">
          <button class="delete-btn" (click)="onDelete()" *ngIf="note && note.id">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M3 6H21M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M10 11V16M14 11V16M18 6V20C18 20.5304 17.7893 21.0391 17.4142 21.4142C17.0391 21.7893 16.5304 22 16 22H8C7.46957 22 6.96086 21.7893 6.58579 21.4142C6.21071 21.0391 6 20.5304 6 20V6H18Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Delete
          </button>
        </div>
      </div>

      <div class="tags-section">
        <label>Tags (comma-separated)</label>
        <input 
          type="text" 
          class="tags-input" 
          placeholder="e.g., work, personal, ideas" 
          [(ngModel)]="tagsString"
          (ngModelChange)="onTagsChange()"
        />
      </div>

      <div class="content-section">
        <textarea 
          class="content-textarea" 
          placeholder="Write your note here..." 
          [(ngModel)]="noteContent"
          (ngModelChange)="onContentChange()"
        ></textarea>
      </div>

      <div class="editor-footer">
        <div class="save-status" [class.saving]="isSaving">
          <span *ngIf="isSaving">Saving...</span>
          <span *ngIf="!isSaving && lastSaved">Saved</span>
          <span *ngIf="!isSaving && !lastSaved">Ready</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .editor-container {
      height: 100vh;
      display: flex;
      flex-direction: column;
      background: var(--bg-primary);
    }

    .editor-header {
      padding: 1.5rem;
      border-bottom: 1px solid var(--border-color);
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
    }

    .title-input {
      flex: 1;
      font-size: 1.5rem;
      font-weight: 600;
      padding: 0.5rem;
      border: none;
      background: transparent;
      color: var(--text-primary);
      outline: none;
    }

    .title-input::placeholder {
      color: var(--text-tertiary);
    }

    .editor-actions {
      display: flex;
      gap: 0.75rem;
    }

    .delete-btn {
      padding: 0.5rem 1rem;
      background: rgba(239, 68, 68, 0.1);
      color: #ef4444;
      border: 1px solid rgba(239, 68, 68, 0.3);
      border-radius: 8px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-weight: 500;
      transition: all 0.2s;
    }

    .delete-btn:hover {
      background: #ef4444;
      color: white;
      border-color: #ef4444;
    }

    .tags-section {
      padding: 0 1.5rem 1rem 1.5rem;
    }

    .tags-section label {
      display: block;
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--text-secondary);
      margin-bottom: 0.5rem;
    }

    .tags-input {
      width: 100%;
      padding: 0.625rem;
      border: 1px solid var(--border-color);
      border-radius: 10px;
      background: var(--bg-secondary);
      color: var(--text-primary);
      font-size: 0.875rem;
    }

    .tags-input:focus {
      outline: none;
      border-color: var(--primary-color);
    }

    .content-section {
      flex: 1;
      padding: 0 1.5rem;
    }

    .content-textarea {
      width: 100%;
      height: calc(100vh - 220px);
      padding: 1rem;
      border: 1px solid var(--border-color);
      border-radius: 12px;
      background: var(--bg-secondary);
      color: var(--text-primary);
      font-size: 0.9375rem;
      line-height: 1.6;
      resize: none;
      font-family: inherit;
    }

    .content-textarea:focus {
      outline: none;
      border-color: var(--primary-color);
    }

    .editor-footer {
      padding: 1rem 1.5rem;
      border-top: 1px solid var(--border-color);
    }

    .save-status {
      text-align: right;
      font-size: 0.75rem;
      color: var(--text-tertiary);
    }

    .save-status.saving {
      color: var(--primary-color);
    }

    @media (max-width: 768px) {
      .editor-header {
        padding: 1rem;
      }

      .title-input {
        font-size: 1.25rem;
      }

      .content-textarea {
        height: calc(100vh - 180px);
      }
    }
  `]
})
export class EditorComponent implements OnInit, OnDestroy, OnChanges {
  @Input() note: Note | null = null;
  @Output() save = new EventEmitter<Partial<Note>>();
  @Output() delete = new EventEmitter<string>();

  noteTitle: string = '';
  noteContent: string = '';
  tagsString: string = '';
  isSaving: boolean = false;
  lastSaved: Date | null = null;

  private saveSubject = new Subject<void>();
  private titleSubject = new Subject<void>();
  private contentSubject = new Subject<void>();
  private tagsSubject = new Subject<void>();

  ngOnInit(): void {
    // Auto-save debounce
    this.saveSubject.pipe(debounceTime(800)).subscribe(() => {
      this.emitSave();
    });

    // Individual debounces for title, content, tags
    this.titleSubject.pipe(debounceTime(800)).subscribe(() => {
      this.saveSubject.next();
    });

    this.contentSubject.pipe(debounceTime(800)).subscribe(() => {
      this.saveSubject.next();
    });

    this.tagsSubject.pipe(debounceTime(800)).subscribe(() => {
      this.saveSubject.next();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['note'] && this.note) {
      this.noteTitle = this.note.title;
      this.noteContent = this.note.content;
      this.tagsString = this.note.tags.join(', ');
    } else if (changes['note'] && !this.note) {
      this.clearEditor();
    }
  }

  ngOnDestroy(): void {
    this.saveSubject.complete();
    this.titleSubject.complete();
    this.contentSubject.complete();
    this.tagsSubject.complete();
  }

  onTitleChange(): void {
    this.titleSubject.next();
  }

  onContentChange(): void {
    this.contentSubject.next();
  }

  onTagsChange(): void {
    this.tagsSubject.next();
  }

  private emitSave(): void {
    if (!this.noteTitle && !this.noteContent && !this.tagsString && this.note?.id) {
      return;
    }

    this.isSaving = true;
    const tags = this.tagsString.split(',').map(tag => tag.trim()).filter(tag => tag);
    
    this.save.emit({
      id: this.note?.id,
      title: this.noteTitle || 'Untitled',
      content: this.noteContent,
      tags: tags
    });

    setTimeout(() => {
      this.isSaving = false;
      this.lastSaved = new Date();
      
      setTimeout(() => {
        this.lastSaved = null;
      }, 2000);
    }, 500);
  }

  onDelete(): void {
    if (this.note && this.note.id && confirm('Are you sure you want to delete this note?')) {
      this.delete.emit(this.note.id);
      this.clearEditor();
    }
  }

  private clearEditor(): void {
    this.noteTitle = '';
    this.noteContent = '';
    this.tagsString = '';
  }
}