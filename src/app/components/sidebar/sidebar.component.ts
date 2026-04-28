import { Component, Output, EventEmitter, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { NoteItemComponent } from '../note-item/note-item.component';
import { Note } from '../../models/note.model';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, FormsModule, NoteItemComponent],
  template: `
    <div class="sidebar" [class.mobile-open]="isMobileOpen">
      <div class="sidebar-header">
        <div class="logo">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
            <path d="M8 7H16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <path d="M8 12H12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
          <h1>NoteVault</h1>
        </div>
        <div class="header-actions">
          <button class="theme-toggle-desktop" (click)="onToggleTheme()" title="Toggle Theme">
            <svg *ngIf="!isDarkMode" width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 3V4M12 20V21M4 12H3M6.31412 6.31412L5.5 5.5M17.6859 6.31412L18.5 5.5M6.31412 17.69L5.5 18.5M17.6859 17.69L18.5 18.5M21 12H20M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
            <svg *ngIf="isDarkMode" width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 3C10.6868 3 9.38642 3.25866 8.17317 3.7612C6.95991 4.26375 5.85752 5.00035 4.92893 5.92893C3.05357 7.8043 2 10.3478 2 13C2 15.6522 3.05357 18.1957 4.92893 20.0711C5.85752 20.9997 6.95991 21.7362 8.17317 22.2388C9.38642 22.7413 10.6868 23 12 23C14.6522 23 17.1957 21.9464 19.0711 20.0711C20.9464 18.1957 22 15.6522 22 13C22 10.3478 20.9464 7.8043 19.0711 5.92893C18.1425 5.00035 17.0401 4.26375 15.8268 3.7612C14.6136 3.25866 13.3132 3 12 3Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <button class="mobile-close" (click)="closeMobile()" *ngIf="isMobileOpen">×</button>
        </div>
      </div>

      <div class="search-box">
        <svg class="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <input 
          type="text" 
          placeholder="Search notes..." 
          [(ngModel)]="searchTerm"
          (ngModelChange)="onSearch()"
        />
      </div>

      <div class="sort-control">
        <select [(ngModel)]="sortBy" (ngModelChange)="onSortChange()">
          <option value="updated-desc">Last Modified (Newest First)</option>
          <option value="updated-asc">Last Modified (Oldest First)</option>
          <option value="created-desc">Created Date (Newest First)</option>
          <option value="created-asc">Created Date (Oldest First)</option>
        </select>
      </div>

      <button class="new-note-btn" (click)="onNewNote()">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M12 4V20M20 12H4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
        New Note
      </button>

      <div class="notes-list">
        <!-- Empty state when no notes or no search results -->
        <div *ngIf="notes.length === 0" class="empty-notes">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
            <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" stroke-width="2"/>
            <path d="M8 7H16" stroke="currentColor" stroke-width="2"/>
            <path d="M8 12H12" stroke="currentColor" stroke-width="2"/>
          </svg>
          <p *ngIf="!searchTerm">No notes found</p>
          <p *ngIf="!searchTerm" class="subtext">Create your first note!</p>
          <p *ngIf="searchTerm">No notes match "{{ searchTerm }}"</p>
          <p *ngIf="searchTerm" class="subtext">Try a different search term</p>
        </div>
        <app-note-item 
          *ngFor="let note of notes" 
          [note]="note"
          (select)="onSelectNote($event)">
        </app-note-item>
      </div>
    </div>
  `,
  styles: [`
    .sidebar {
      width: 320px;
      background: var(--bg-primary);
      border-right: 1px solid var(--border-color);
      display: flex;
      flex-direction: column;
      height: 100vh;
      position: fixed;
      left: 0;
      top: 0;
      z-index: 100;
      transition: transform 0.3s ease;
    }

    @media (max-width: 768px) {
      .sidebar {
        transform: translateX(-100%);
      }
      
      .sidebar.mobile-open {
        transform: translateX(0);
      }
    }

    .sidebar-header {
      padding: 1.5rem;
      border-bottom: 1px solid var(--border-color);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .theme-toggle-desktop {
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      border-radius: 8px;
      padding: 0.5rem;
      cursor: pointer;
      color: var(--text-primary);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
    }

    .theme-toggle-desktop:hover {
      background: var(--bg-hover);
      border-color: var(--primary-color);
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      color: var(--primary-color);
    }

    .logo h1 {
      font-size: 1.5rem;
      font-weight: 700;
      margin: 0;
    }

    .mobile-close {
      background: none;
      border: none;
      font-size: 2rem;
      cursor: pointer;
      color: var(--text-secondary);
      display: none;
    }

    @media (max-width: 768px) {
      .mobile-close {
        display: block;
      }
    }

    .search-box {
      margin: 1rem;
      position: relative;
    }

    .search-icon {
      position: absolute;
      left: 0.75rem;
      top: 50%;
      transform: translateY(-50%);
      color: var(--text-tertiary);
    }

    .search-box input {
      width: 100%;
      padding: 0.625rem 0.625rem 0.625rem 2.5rem;
      border: 1px solid var(--border-color);
      border-radius: 10px;
      background: var(--bg-secondary);
      color: var(--text-primary);
      font-size: 0.875rem;
      transition: all 0.2s;
    }

    .search-box input:focus {
      outline: none;
      border-color: var(--primary-color);
      box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.1);
    }

    .sort-control {
      margin: 0 1rem 1rem 1rem;
    }

    .sort-control select {
      width: 100%;
      padding: 0.625rem;
      border: 1px solid var(--border-color);
      border-radius: 10px;
      background: var(--bg-secondary);
      color: var(--text-primary);
      font-size: 0.875rem;
      cursor: pointer;
    }

    .new-note-btn {
      margin: 0 1rem 1rem 1rem;
      padding: 0.75rem;
      background: var(--primary-color);
      color: white;
      border: none;
      border-radius: 10px;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      transition: all 0.2s;
    }

    .new-note-btn:hover {
      background: var(--primary-hover);
      transform: translateY(-1px);
      box-shadow: var(--shadow-md);
    }

    .notes-list {
      flex: 1;
      overflow-y: auto;
      padding: 0 1rem;
    }

    .empty-notes {
      text-align: center;
      padding: 3rem 1rem;
      color: var(--text-secondary);
    }

    .empty-notes svg {
      margin-bottom: 1rem;
      opacity: 0.5;
    }

    .empty-notes .subtext {
      font-size: 0.875rem;
      margin-top: 0.5rem;
      opacity: 0.7;
    }
  `]
})
export class SidebarComponent implements OnInit, OnDestroy {
  @Input() notes: Note[] = [];
  @Input() isDarkMode: boolean = false;
  @Output() selectNote = new EventEmitter<Note>();
  @Output() newNote = new EventEmitter<void>();
  @Output() sortChange = new EventEmitter<string>();
  @Output() searchChange = new EventEmitter<string>();
  @Output() toggleTheme = new EventEmitter<void>();

  searchTerm: string = '';
  sortBy: string = 'updated-desc';
  isMobileOpen: boolean = false;
  private searchSubject = new Subject<string>();

  ngOnInit(): void {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(term => {
      this.searchChange.emit(term);
    });
  }

  ngOnDestroy(): void {
    this.searchSubject.complete();
  }

  onSearch(): void {
    this.searchSubject.next(this.searchTerm);
  }

  onSortChange(): void {
    this.sortChange.emit(this.sortBy);
  }

  onSelectNote(note: Note): void {
    this.selectNote.emit(note);
    if (window.innerWidth <= 768) {
      this.isMobileOpen = false;
    }
  }

  onNewNote(): void {
    this.newNote.emit();
    if (window.innerWidth <= 768) {
      this.isMobileOpen = false;
    }
  }

  openMobile(): void {
    this.isMobileOpen = true;
  }

  closeMobile(): void {
    this.isMobileOpen = false;
  }

  onToggleTheme(): void {
    this.toggleTheme.emit();
  }
}