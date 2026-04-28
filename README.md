# NoteVault - Offline-First Notes Application

A modern, professional browser-based notes application that works fully offline with IndexedDB storage.

## ✨ Features

### 1. Notes CRUD System
- **Create** new notes with title, content, and tags
- **Edit** existing notes with auto-update of last modified date
- **Delete** notes permanently with confirmation dialog
- Each note contains: id, title, content, tags (array), createdAt, updatedAt

### 2. IndexedDB Storage
- **Database Name**: notesDB
- **Store Name**: notes
- **Indexes**: title, updatedAt, createdAt, tags (multiEntry)
- Clean service architecture with full RxJS integration
- No localStorage/sessionStorage used for notes data

### 3. Search & Filter
- Real-time dynamic search bar
- Search by: Title, Content, Tags
- Instant results as you type
- 300ms debouncing for optimal performance

### 4. Sorting Options
- Created Date (Newest First)
- Created Date (Oldest First)
- Last Modified (Newest First)
- Last Modified (Oldest First)

### 5. UI Layout
**Desktop:**
- Sidebar with app logo, search bar, sort dropdown, new note button, and notes list
- Each note preview shows: title, content preview, updated time, and tags
- Main panel with title input, tags input, content textarea, save status, and delete button

**Mobile:**
- Collapsible sidebar
- Notes list toggle button
- Full-screen editor
- Responsive design

### 6. Auto Save
- Automatic saving after 800ms debounce when typing
- Visual save status indicator (Ready, Saving, Saved)

### 7. Dark Mode
- Toggle between light and dark themes
- CSS variables for consistent theming
- Theme preference saved in localStorage

### 8. Export Notes
- Export all notes as JSON file
- One-click download functionality
- Timestamped filename

### 9. Empty State UI
- Friendly message when no notes exist
- "Create your first note" call-to-action
- Search-specific empty states

## 🛠 Tech Stack

- **Angular 19** - Latest version with standalone components
- **TypeScript** - Strong typing and modern JavaScript
- **HTML/CSS/SCSS** - Modern styling with CSS variables
- **IndexedDB (idb wrapper)** - Client-side database storage
- **RxJS** - Reactive programming with Observables
- **Angular Signals** - Modern state management

## 📂 IndexedDB Schema

```
Database: notesDB
Version: 1

Object Store: notes
- Key Path: id
- Indexes:
  - title (string)
  - updatedAt (date)
  - createdAt (date)
  - tags (multiEntry array)
```

### Note Structure
```typescript
interface Note {
  id: string;          // Unique identifier (UUID)
  title: string;       // Note title
  content: string;     // Note content
  tags: string[];      // Array of tags
  createdAt: Date;     // Creation timestamp
  updatedAt: Date;     // Last modification timestamp
}
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Steps

1. **Clone or download the project**
   ```bash
   cd notevault
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```
   or
   ```bash
   ng serve
   ```

4. **Open browser**
   Navigate to `http://localhost:4200`

### Build for Production
```bash
npm run build
```

## 📁 Project Structure

```
src/app/
├── components/
│   ├── sidebar/
│   │   └── sidebar.component.ts      # Sidebar with search, sort, notes list
│   ├── editor/
│   │   └── editor.component.ts       # Note editor with auto-save
│   └── note-item/
│       └── note-item.component.ts    # Individual note preview card
├── services/
│   └── indexeddb.service.ts          # IndexedDB operations service
├── models/
│   └── note.model.ts                 # TypeScript interfaces
├── app.component.ts                  # Main app component
├── app.config.ts                     # App configuration
├── app.html                          # App template (empty - uses inline)
└── app.scss                          # App styles (empty - uses global)
```

## 🔧 How It Works

### Data Flow
1. **User Action** → Component emits event
2. **App Component** → Handles event and calls IndexedDBService
3. **IndexedDBService** → Performs database operation using idb wrapper
4. **Database** → Stores/retrieves data from IndexedDB
5. **Observable** → Returns data as RxJS Observable
6. **Component** → Updates UI with new data

### Auto-Save Mechanism
1. User types in editor (title, content, or tags)
2. Change triggers Subject with 800ms debounce
3. After debounce, save event emits to parent
4. Parent calls IndexedDBService.updateNote()
5. Note saved to IndexedDB
6. Save status updates in UI

### Search Implementation
1. User types in search bar
2. Input triggers Subject with 300ms debounce
3. Search term emitted to parent component
4. Parent filters notes array by:
   - Title (case-insensitive)
   - Content (case-insensitive)
   - Tags (case-insensitive array match)
5. Filtered results displayed in sidebar

### Theme System
- CSS variables defined in `:root` for light theme
- `.dark` class overrides variables for dark theme
- Theme toggle adds/removes `.dark` class on app container
- Theme preference stored in localStorage (for theme only, not notes)

## 🎨 UI Features

- Premium modern SaaS dashboard design
- Rounded cards with soft shadows
- Smooth hover effects and transitions
- Clean typography with system fonts
- Sidebar with subtle borders
- Attractive indigo color palette
- Custom scrollbar styling
- Responsive mobile layout

## 📱 Responsive Design

### Desktop (>768px)
- Full sidebar visible (320px width)
- Main content area with margin-left
- All features accessible

### Mobile (≤768px)
- Sidebar hidden by default
- Hamburger menu to open sidebar
- Full-width editor
- Mobile header with controls
- Touch-friendly interface

## 🔒 Offline-First

- All data stored in IndexedDB (browser database)
- No server required
- Works completely offline
- Data persists across browser sessions
- Fast performance (no network calls)

## 📦 StackBlitz Ready

This project is ready to run on StackBlitz:
1. Upload project files to StackBlitz
2. Dependencies will auto-install
3. App will start automatically

## 🎯 Code Quality

- ✅ Clean, reusable components
- ✅ Strong TypeScript typing
- ✅ Modular architecture
- ✅ Comments where needed
- ✅ Angular best practices
- ✅ RxJS for reactive programming
- ✅ Standalone components (no NgModules)
- ✅ Proper separation of concerns

## 📄 License

MIT License - feel free to use this project for learning or production.

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

---

**Built with ❤️ using Angular 19**
