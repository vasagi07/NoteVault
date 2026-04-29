# NoteVault

<div align="center">

![Angular](https://img.shields.io/badge/Angular_19-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript_5.6-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![IndexedDB](https://img.shields.io/badge/IndexedDB-FF9900?style=for-the-badge&logo=googlechrome&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**A modern, offline-first notes application built with Angular 19**

*Store your notes securely in your browser with zero server dependencies*

</div>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Project Architecture](#project-architecture)
- [Implementation Details](#implementation-details)
- [Database Schema](#database-schema)
- [Usage Guide](#usage-guide)
- [Responsive Design](#responsive-design)
- [Development Commands](#development-commands)
- [Code Quality](#code-quality)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)

---

## 🌟 Overview

NoteVault is a professional, browser-based notes application that works **completely offline**. Built with Angular 19 and IndexedDB, it provides a seamless note-taking experience without requiring any server or backend infrastructure. All data is stored locally in your browser, ensuring privacy and instant access.

### Key Highlights

- 🔒 **100% Offline** - No internet connection required
- 💾 **Local Storage** - Uses IndexedDB (not localStorage)
- ⚡ **Lightning Fast** - Zero network latency
- 🎨 **Modern UI** - Premium SaaS-style design
- 📱 **Responsive** - Works on desktop and mobile
- 🌙 **Dark Mode** - Easy on the eyes
- 💾 **Auto-Save** - Never lose your work

---

## ✨ Features

### 📝 Notes Management
- **Create** - Add new notes with title, content, and tags
- **Read** - View notes with preview cards showing title, content snippet, tags, and timestamp
- **Update** - Edit notes with automatic timestamp updates
- **Delete** - Remove notes with confirmation dialog
- **Auto-Save** - Automatic saving after 800ms of inactivity

### 🔍 Search & Filter
- **Real-time Search** - Instant results as you type
- **Multi-field Search** - Searches across title, content, and tags
- **Debounced Input** - 300ms debounce for optimal performance
- **Case-insensitive** - Finds matches regardless of capitalization

### 📊 Sorting
- Created Date (Newest First)
- Created Date (Oldest First)
- Last Modified (Newest First)
- Last Modified (Oldest First)

### 🎨 Theme System
- **Light Mode** - Clean, bright interface
- **Dark Mode** - Easy-on-the-eyes dark theme
- **Persistent** - Theme preference saved across sessions
- **CSS Variables** - Smooth, instant theme switching

### 💾 Data Export
- **JSON Export** - Download all notes as JSON file
- **Timestamped** - Files include date/time in filename
- **One-click** - Simple export button in interface

### 📱 Responsive Design
- **Desktop** - Full sidebar with all features visible
- **Tablet** - Optimized layout for medium screens
- **Mobile** - Collapsible sidebar with hamburger menu
- **Touch-friendly** - Optimized for touch interactions

### 🎯 User Experience
- **Empty States** - Friendly messages when no notes exist
- **Save Status** - Visual indicator (Ready → Saving → Saved)
- **Tag System** - Comma-separated tags with visual badges
- **Time Formatting** - Smart relative timestamps ("2 hours ago")
- **Confirmation Dialogs** - Prevent accidental deletions

---

## 🛠 Tech Stack

### Core Technologies
- **Angular 19** - Latest Angular with standalone components
- **TypeScript 5.6** - Strong typing and modern JavaScript features
- **RxJS 7.8** - Reactive programming with Observables and Subjects
- **IndexedDB** - Browser-native database for offline storage

### Libraries & Tools
- **idb** - Promise-based IndexedDB wrapper for cleaner async code
- **Angular Forms** - Template-driven forms with two-way binding
- **Angular Common** - Built-in directives (*ngIf, *ngFor, etc.)

### Styling
- **SCSS** - CSS preprocessor with variables and nesting
- **CSS Custom Properties** - Dynamic theming with CSS variables
- **Flexbox/Grid** - Modern CSS layout techniques
- **SVG Icons** - Inline SVG for crisp, scalable icons

### Development Tools
- **Angular CLI** - Project scaffolding and build tooling
- **Karma** - Test runner for unit testing
- **Jasmine** - Behavior testing framework
- **Prettier** - Code formatting and style consistency

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0 or higher) - [Download](https://nodejs.org/)
- **npm** (v9.0 or higher) - Comes with Node.js
- **Modern Browser** - Chrome, Firefox, Safari, or Edge

### Verify Installation

```bash
node --version   # Should show v18.0.0 or higher
npm --version    # Should show v9.0.0 or higher
```

---

## 🚀 Installation & Setup

### Step 1: Clone or Download the Project

```bash
# Clone the repository (if applicable)
git clone <repository-url>
cd notevault

# OR navigate to existing project
cd path/to/notevault
```

### Step 2: Install Dependencies

```bash
# Install all required packages
npm install
```

This will install:
- Angular 19 core packages
- RxJS for reactive programming
- idb for IndexedDB operations
- Development tools (TypeScript, Karma, Jasmine)

### Step 3: Start Development Server

```bash
# Start the application
npm start

# OR using Angular CLI directly
ng serve
```

The development server will:
- Compile the TypeScript code
- Bundle all assets and styles
- Start a local web server
- Enable hot reload for live updates

### Step 4: Access the Application

Open your browser and navigate to:

```
http://localhost:4200
```

You should see the NoteVault interface with an empty notes list. Start creating notes!

---

## 🏗 Project Architecture

### Directory Structure

```
notevault/
├── public/                          # Static assets
│   ├── logo.png                    # Application logo
│   └── favicon.ico                 # Browser tab icon
│
├── src/                            # Source code
│   ├── app/                        # Angular application
│   │   ├── components/             # UI components
│   │   │   ├── sidebar/
│   │   │   │   └── sidebar.component.ts      # Sidebar with search, sort, notes list
│   │   │   ├── editor/
│   │   │   │   └── editor.component.ts       # Note editor with auto-save
│   │   │   └── note-item/
│   │   │       └── note-item.component.ts    # Individual note preview card
│   │   │
│   │   ├── services/               # Business logic
│   │   │   └── indexeddb.service.ts          # IndexedDB operations
│   │   │
│   │   ├── models/                 # TypeScript interfaces
│   │   │   └── note.model.ts                 # Note data structure
│   │   │
│   │   ├── app.component.ts        # Root component (orchestrator)
│   │   └── app.config.ts           # Application configuration
│   │
│   ├── index.html                  # Main HTML file
│   ├── main.ts                     # Application entry point
│   └── styles.scss                 # Global styles and CSS variables
│
├── angular.json                    # Angular CLI configuration
├── package.json                    # Dependencies and scripts
├── tsconfig.json                   # TypeScript configuration
├── .editorconfig                   # Editor settings
├── .prettierrc                     # Code formatting rules
└── README.md                       # Project documentation
```

### Component Architecture

```
┌─────────────────────────────────────────────────┐
│              AppComponent (Root)                │
│  - State management (notes, filters, theme)    │
│  - Event coordination                           │
│  - Data flow orchestration                      │
└──────────────┬──────────────────────────────────┘
               │
       ┌───────┴────────┐
       │                │
┌──────▼──────┐  ┌──────▼──────┐
│  Sidebar    │  │   Editor    │
│ Component   │  │ Component   │
│             │  │             │
│ - Search    │  │ - Title     │
│ - Sort      │  │ - Content   │
│ - Note List │  │ - Tags      │
│ - New Note  │  │ - Auto-save │
│             │  │ - Delete    │
│ ┌─────────┐ │  └─────────────┘
│ │NoteItem │ │
│ │Component│ │
│ └─────────┘ │
└─────────────┘
       │
       ▼
┌──────────────────────┐
│ IndexedDBService     │
│ - addNote()          │
│ - updateNote()       │
│ - deleteNote()       │
│ - getAllNotes()      │
│ - searchNotes()      │
└──────────────────────┘
```

---

## 🔧 Implementation Details

### 1. IndexedDB Service Architecture

**File:** `src/app/services/indexeddb.service.ts`

The service uses the `idb` library to wrap IndexedDB operations in Promises, then converts them to RxJS Observables for seamless integration with Angular.

**Key Implementation Points:**

```typescript
// Database initialization with version control
private async initDB(): Promise<void> {
  this.db = await openDB(this.dbName, this.dbVersion, {
    upgrade(db) {
      // Create object store with indexes
      const store = db.createObjectStore('notes', { keyPath: 'id' });
      store.createIndex('title', 'title');
      store.createIndex('updatedAt', 'updatedAt');
      store.createIndex('createdAt', 'createdAt');
      store.createIndex('tags', 'tags', { multiEntry: true });
    }
  });
}
```

**Date Handling:**
- Dates are stored as ISO strings in IndexedDB
- Converted back to Date objects when retrieved
- Ensures proper sorting and formatting

### 2. Auto-Save Mechanism

**File:** `src/app/components/editor/editor.component.ts`

Uses RxJS Subjects with debounceTime to prevent excessive saves:

```typescript
// Debounced save with 800ms delay
private saveSubject = new Subject<void>();

ngOnInit(): void {
  this.saveSubject.pipe(
    debounceTime(800)
  ).subscribe(() => {
    this.emitSave();
  });
}

// Triggered on every input change
onContentChange(): void {
  this.saveSubject.next();
}
```

**Benefits:**
- Reduces database writes
- Improves performance
- Saves automatically after user stops typing

### 3. Search Implementation

**File:** `src/app/components/sidebar/sidebar.component.ts`

Real-time search with debouncing:

```typescript
// Search subject with 300ms debounce
private searchSubject = new Subject<string>();

ngOnInit(): void {
  this.searchSubject.pipe(
    debounceTime(300),
    distinctUntilChanged()
  ).subscribe(term => {
    this.searchChange.emit(term);
  });
}
```

**Search Logic (AppComponent):**
```typescript
private applyFilters(): void {
  let result = [...this.notes];
  
  // Filter by search term
  if (this.currentSearch) {
    const term = this.currentSearch.toLowerCase();
    result = result.filter(note => 
      note.title.toLowerCase().includes(term) ||
      note.content.toLowerCase().includes(term) ||
      note.tags.some(tag => tag.toLowerCase().includes(term))
    );
  }
  
  // Apply sorting
  result = this.sortNotes(result, this.currentSort);
  this.filteredNotes = result;
}
```

### 4. Dark Theme System

**File:** `src/styles.scss`

Uses CSS custom properties for instant theme switching:

```scss
// Light theme (default)
:root {
  --bg-primary: #ffffff;
  --text-primary: #111827;
  --border-color: #e5e7eb;
  // ... more variables
}

// Dark theme
.dark {
  --bg-primary: #1f2937;
  --text-primary: #f9fafb;
  --border-color: #374151;
  // ... more variables
}
```

**Theme Toggle (AppComponent):**
```typescript
toggleTheme(): void {
  this.isDarkMode = !this.isDarkMode;
  localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
  
  // Apply to body for global access
  if (this.isDarkMode) {
    document.body.classList.add('dark');
  } else {
    document.body.classList.remove('dark');
  }
}
```

### 5. Mobile Sidebar with Backdrop

**File:** `src/app/app.component.ts`

Uses Angular's ViewChild for component communication:

```typescript
@ViewChild('sidebar') sidebar!: SidebarComponent;

toggleSidebar(): void {
  if (this.sidebar) {
    this.sidebar.openMobile();
  }
}

closeSidebar(): void {
  if (this.sidebar) {
    this.sidebar.closeMobile();
  }
}
```

**Backdrop Implementation:**
```html
<div class="sidebar-backdrop" 
     *ngIf="sidebar?.isMobileOpen" 
     (click)="closeSidebar()">
</div>
```

---

## 📂 Database Schema

### IndexedDB Structure

```
┌─────────────────────────────────────────┐
│         Database: notesDB               │
│         Version: 1                      │
└─────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│      Object Store: notes                │
│      Key Path: id (string)              │
├─────────────────────────────────────────┤
│  Indexes:                               │
│  • title (string)                       │
│  • updatedAt (Date as ISO string)       │
│  • createdAt (Date as ISO string)       │
│  • tags (multiEntry array)              │
└─────────────────────────────────────────┘
```

### Note Data Model

**File:** `src/app/models/note.model.ts`

```typescript
export interface Note {
  id: string;          // UUID or timestamp-based unique ID
  title: string;       // Note title (can be empty)
  content: string;     // Full note content
  tags: string[];      // Array of tags (from comma-separated input)
  createdAt: Date;     // Creation timestamp
  updatedAt: Date;     // Last modification timestamp
}

export interface NoteInput {
  title: string;
  content: string;
  tags: string;        // Comma-separated string (converted to array)
}
```

### Storage Format

**In IndexedDB:**
```json
{
  "id": "abc123-def456-ghi789",
  "title": "Meeting Notes",
  "content": "Discussed project timeline...",
  "tags": ["work", "meeting", "important"],
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T14:45:00.000Z"
}
```

---

## 📖 Usage Guide

### Creating Your First Note

1. Click the **"New Note"** button in the sidebar
2. Enter a title in the title field
3. Add tags (comma-separated) in the tags field
4. Write your content in the editor
5. Note auto-saves after you stop typing (800ms)

### Editing Notes

1. Click on any note in the sidebar
2. Modify title, tags, or content
3. Changes save automatically
4. "Saved" indicator appears when complete

### Searching Notes

1. Type in the search bar at the top of sidebar
2. Results filter instantly as you type
3. Searches title, content, and tags
4. Clear search to see all notes

### Sorting Notes

1. Click the sort dropdown in sidebar
2. Choose your preferred sort order:
   - Last Modified (Newest/Oldest First)
   - Created Date (Newest/Oldest First)

### Managing Tags

- Separate tags with commas: `work, personal, ideas`
- Tags display as colored badges
- Search works with partial tag matches

### Deleting Notes

1. Select the note you want to delete
2. Click the **"Delete"** button
3. Confirm deletion in the dialog
4. Note is permanently removed

### Exporting Notes

1. Click the **download icon** (bottom-right corner)
2. JSON file downloads automatically
3. Filename includes timestamp
4. Can be imported back later (future feature)

### Switching Themes

- **Desktop:** Click sun/moon icon in sidebar header
- **Mobile:** Click sun/moon icon in mobile header
- Theme preference persists across sessions

---

## 📱 Responsive Design

### Breakpoints

- **Desktop:** > 768px
- **Mobile:** ≤ 768px

### Desktop Layout (>768px)

```
┌──────────────────────────────────────────────────┐
│  NoteVault  │  [Search]  [Sort]  [+ New Note]   │
│             │  ┌──────────────────────────┐      │
│  ┌───────┐  │  │                          │      │
│  │ Note  │  │  │  Title: ___________      │      │
│  │ Note  │  │  │  Tags:  ___________      │      │
│  │ Note  │  │  │                          │      │
│  │ Note  │  │  │  Content:                │      │
│  │       │  │  │  ________________        │      │
│  │       │  │  │  ________________        │      │
│  │       │  │  │                          │      │
│  └───────┘  │  │                  [Delete] │      │
│             │  └──────────────────────────┘      │
└──────────────────────────────────────────────────┘
   Sidebar         Main Editor Area
   (320px)         (Flexible width)
```

### Mobile Layout (≤768px)

```
┌─────────────────────────────────────┐
│ [☰]  NoteVault Logo  [🌙/☀️]       │  ← Header
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│                                     │
│  Full-screen editor                 │
│                                     │
│  Title: ________________            │
│  Tags:  ________________            │
│                                     │
│  Content:                           │
│  ________________________           │
│  ________________________           │
│                                     │
└─────────────────────────────────────┘

← Swipe or tap [☰] to open sidebar →
```

### Mobile Sidebar (When Open)

```
┌──────────────────┐
│ NoteVault  [×]   │  ← Close button
│ [🌙/☀️]          │  ← Theme toggle
├──────────────────┤
│ [Search...]      │
│ [Sort Dropdown]  │
│ [+ New Note]     │
├──────────────────┤
│ 📝 Note 1        │
│ 📝 Note 2        │
│ 📝 Note 3        │
└──────────────────┘
     ↑
Slides in from left
with backdrop overlay
```

---

## 💻 Development Commands

### Common Commands

```bash
# Start development server with hot reload
npm start

# Build for production (optimized)
npm run build

# Watch mode (rebuild on file changes)
npm run watch

# Run unit tests
npm test

# Run Angular CLI commands
ng generate component <name>
ng generate service <name>
ng generate interface <name>
```

### Build Output

Production build creates optimized files in `dist/notevault/`:
- Minified JavaScript bundles
- Optimized CSS
- Compressed assets
- Ready for deployment

---

## 🎯 Code Quality

### Best Practices Implemented

✅ **Standalone Components** - No NgModules, cleaner architecture  
✅ **Strong TypeScript Typing** - Full type safety across the app  
✅ **RxJS Patterns** - Observables, Subjects, debounce, operators  
✅ **Separation of Concerns** - Components, services, models  
✅ **Reactive Forms** - Template-driven with two-way binding  
✅ **CSS Variables** - Dynamic theming without recompilation  
✅ **Responsive Design** - Mobile-first approach  
✅ **Error Handling** - Graceful degradation  
✅ **Code Comments** - Clear documentation where needed  
✅ **Consistent Naming** - Descriptive, conventional naming  

### Performance Optimizations

- **Debounced Inputs** - Reduces unnecessary saves/searches
- **Lazy Loading** - Components load on demand
- **Change Detection** - Angular's optimized rendering
- **IndexedDB Indexes** - Fast queries and sorting
- **Minimal Dependencies** - Only essential packages

---

## 🚀 Future Enhancements

Potential features for future versions:

- [ ] **Rich Text Editor** - Markdown or WYSIWYG support
- [ ] **Note Categories** - Folder/group organization
- [ ] **Note Pinning** - Pin important notes to top
- [ ] **Import Notes** - Import from JSON backup
- [ ] **Note Sharing** - Export individual notes
- [ ] **Keyboard Shortcuts** - Power user features
- [ ] **Note Colors** - Color-code notes
- [ ] **Archive** - Soft delete with trash folder
- [ ] **Full-text Search** - Advanced search operators
- [ ] **PWA Support** - Install as native app

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request



---

<div align="center">

**Made with ❤️ using Angular 19**

⭐ If you found this project helpful, please give it a star!

</div>
