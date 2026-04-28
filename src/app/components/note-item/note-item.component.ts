import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Note } from '../../models/note.model';

@Component({
  selector: 'app-note-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="note-item" (click)="onSelect()">
      <h3 class="note-title">{{ note.title || 'Untitled' }}</h3>
      <p class="note-preview">{{ getPreview() }}</p>
      <div class="note-tags" *ngIf="note.tags.length">
        <span class="tag" *ngFor="let tag of note.tags.slice(0, 3)">
          {{ tag }}
        </span>
        <span class="tag-more" *ngIf="note.tags.length > 3">+{{ note.tags.length - 3 }}</span>
      </div>
      <div class="note-meta">
        <span class="updated-time">{{ formatDate(note.updatedAt) }}</span>
      </div>
    </div>
  `,
  styles: [`
    .note-item {
      padding: 1rem;
      border-radius: 12px;
      cursor: pointer;
      transition: all 0.2s ease;
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      margin-bottom: 0.75rem;
    }

    .note-item:hover {
      transform: translateX(4px);
      background: var(--bg-hover);
      border-color: var(--primary-color);
      box-shadow: var(--shadow-md);
    }

    .note-title {
      font-size: 1rem;
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 0.5rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .note-preview {
      font-size: 0.875rem;
      color: var(--text-secondary);
      margin-bottom: 0.75rem;
      line-height: 1.4;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .note-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 0.75rem;
    }

    .tag {
      font-size: 0.75rem;
      padding: 0.25rem 0.5rem;
      background: var(--tag-bg);
      color: var(--tag-text);
      border-radius: 6px;
      font-weight: 500;
    }

    .tag-more {
      font-size: 0.75rem;
      padding: 0.25rem 0.5rem;
      background: var(--tag-bg);
      color: var(--text-secondary);
      border-radius: 6px;
      font-weight: 500;
    }

    .note-meta {
      font-size: 0.75rem;
      color: var(--text-tertiary);
    }
  `]
})
export class NoteItemComponent {
  @Input() note!: Note;
  @Output() select = new EventEmitter<Note>();

  onSelect(): void {
    this.select.emit(this.note);
  }

  getPreview(): string {
    if (!this.note.content) return 'No content';
    return this.note.content.length > 100 
      ? this.note.content.substring(0, 100) + '...' 
      : this.note.content;
  }

  formatDate(date: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - new Date(date).getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    
    return new Date(date).toLocaleDateString();
  }
}