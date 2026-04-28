import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexedDBService } from './services/indexeddb.service';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { EditorComponent } from './components/editor/editor.component';
import { Note } from './models/note.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, SidebarComponent, EditorComponent],
  template: `
    <div class="app-container" [class.dark]="isDarkMode">
      <div class="app-header-mobile">
        <button class="menu-toggle" (click)="toggleSidebar()">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
        <div class="mobile-logo">
          <h2>NoteVault</h2>
        </div>
        <button class="theme-toggle" (click)="toggleTheme()">
          <svg *ngIf="!isDarkMode" width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M12 3V4M12 20V21M4 12H3M6.31412 6.31412L5.5 5.5M17.6859 6.31412L18.5 5.5M6.31412 17.69L5.5 18.5M17.6859 17.69L18.5 18.5M21 12H20M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
          <svg *ngIf="isDarkMode" width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M12 3C10.6868 3 9.38642 3.25866 8.17317 3.7612C6.95991 4.26375 5.85752 5.00035 4.92893 5.92893C3.05357 7.8043 2 10.3478 2 13C2 15.6522 3.05357 18.1957 4.92893 20.0711C5.85752 20.9997 6.95991 21.7362 8.17317 22.2388C9.38642 22.7413 10.6868 23 12 23C14.6522 23 17.1957 21.9464 19.0711 20.0711C20.9464 18.1957 22 15.6522 22 13C22 10.3478 20.9464 7.8043 19.0711 5.92893C18.1425 5.00035 17.0401 4.26375 15.8268 3.7612C14.6136 3.25866 13.3132 3 12 3Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
      
      <app-sidebar 
        [notes]="filteredNotes"
        [isDarkMode]="isDarkMode"
        (selectNote)="onSelectNote($event)"
        (newNote)="onNewNote()"
        (sortChange)="onSortChange($event)"
        (searchChange)="onSearchChange($event)"
        (toggleTheme)="toggleTheme()"
        #sidebar>
      </app-sidebar>

      <main class="main-content">
        <app-editor 
          [note]="selectedNote"
          (save)="onSaveNote($event)"
          (delete)="onDeleteNote($event)">
        </app-editor>
      </main>

      <button class="export-btn" (click)="exportNotes()" title="Export Notes">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15M12 3V15M12 15L9 12M12 15L15 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>
  `,
  styles: [`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
    }

    .app-container {
      display: flex;
      min-height: 100vh;
      background: var(--bg-primary);
      color: var(--text-primary);
      position: relative;
    }

    .app-header-mobile {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background: var(--bg-primary);
      padding: 1rem;
      border-bottom: 1px solid var(--border-color);
      z-index: 99;
      align-items: center;
      justify-content: space-between;
    }

    @media (max-width: 768px) {
      .app-header-mobile {
        display: flex;
      }

      .main-content {
        margin-top: 60px;
      }
    }

    .menu-toggle, .theme-toggle {
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      border-radius: 8px;
      padding: 0.5rem;
      cursor: pointer;
      color: var(--text-primary);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .mobile-logo h2 {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--primary-color);
    }

    .main-content {
      flex: 1;
      margin-left: 320px;
      transition: margin-left 0.3s ease;
    }

    @media (max-width: 768px) {
      .main-content {
        margin-left: 0;
      }
    }

    .export-btn {
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: var(--primary-color);
      color: white;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
      box-shadow: var(--shadow-md);
      z-index: 100;
    }

    .export-btn:hover {
      background: var(--primary-hover);
      transform: scale(1.05);
    }
  `]
})
export class AppComponent implements OnInit {
  notes: Note[] = [];
  filteredNotes: Note[] = [];
  selectedNote: Note | null = null;
  isDarkMode: boolean = false;
  private currentSort: string = 'updated-desc';
  private currentSearch: string = '';

  constructor(private dbService: IndexedDBService) {}

  ngOnInit(): void {
    this.loadNotes();
    this.loadTheme();
  }

  @HostListener('window:beforeunload')
  onBeforeUnload(): void {
    // Ensure data is saved
  }

  private loadNotes(): void {
    this.dbService.getAllNotes().subscribe(notes => {
      this.notes = notes;
      this.applyFilters();
    });
  }

  private applyFilters(): void {
    let result = [...this.notes];
    
    // Apply search
    if (this.currentSearch) {
      const term = this.currentSearch.toLowerCase();
      result = result.filter(note => 
        note.title.toLowerCase().includes(term) ||
        note.content.toLowerCase().includes(term) ||
        note.tags.some(tag => tag.toLowerCase().includes(term))
      );
    }
    
    // Apply sort
    result = this.sortNotes(result, this.currentSort);
    
    this.filteredNotes = result;
  }

  private sortNotes(notes: Note[], sortType: string): Note[] {
    switch(sortType) {
      case 'updated-desc':
        return notes.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
      case 'updated-asc':
        return notes.sort((a, b) => a.updatedAt.getTime() - b.updatedAt.getTime());
      case 'created-desc':
        return notes.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      case 'created-asc':
        return notes.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
      default:
        return notes;
    }
  }

  onSelectNote(note: Note): void {
    this.selectedNote = note;
  }

  onNewNote(): void {
    const newNote: Note = {
      id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
      title: '',
      content: '',
      tags: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    this.dbService.addNote(newNote).subscribe(() => {
      this.loadNotes();
      this.selectedNote = newNote;
    });
  }

  onSaveNote(noteData: Partial<Note>): void {
    if (noteData.id) {
      // Update existing note
      const existingNote = this.notes.find(n => n.id === noteData.id);
      if (existingNote) {
        const updatedNote: Note = {
          ...existingNote,
          title: noteData.title || existingNote.title,
          content: noteData.content || existingNote.content,
          tags: noteData.tags || existingNote.tags,
          updatedAt: new Date()
        };
        
        this.dbService.updateNote(updatedNote).subscribe(() => {
          this.loadNotes();
          this.selectedNote = updatedNote;
        });
      }
    } else {
      // Create new note
      const newNote: Note = {
        id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
        title: noteData.title || 'Untitled',
        content: noteData.content || '',
        tags: noteData.tags || [],
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      this.dbService.addNote(newNote).subscribe(() => {
        this.loadNotes();
        this.selectedNote = newNote;
      });
    }
  }

  onDeleteNote(id: string): void {
    this.dbService.deleteNote(id).subscribe(() => {
      this.loadNotes();
      if (this.selectedNote?.id === id) {
        this.selectedNote = null;
      }
    });
  }

  onSortChange(sortValue: string): void {
    this.currentSort = sortValue;
    this.applyFilters();
  }

  onSearchChange(searchTerm: string): void {
    this.currentSearch = searchTerm;
    this.applyFilters();
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
    // Apply dark class to body for global CSS variable access
    if (this.isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }

  private loadTheme(): void {
    const savedTheme = localStorage.getItem('theme');
    this.isDarkMode = savedTheme === 'dark';
    // Apply dark class to body on initial load
    if (this.isDarkMode) {
      document.body.classList.add('dark');
    }
  }

  toggleSidebar(): void {
    const sidebar = document.querySelector('app-sidebar') as any;
    if (sidebar) {
      sidebar.openMobile();
    }
  }

  exportNotes(): void {
    const dataStr = JSON.stringify(this.notes, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `notevault-export-${new Date().toISOString()}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  }
}