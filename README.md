# NoteVault

**A modern, offline-first notes application built with Angular 19**

Store your notes securely in your browser with zero server dependencies. Works completely offline using IndexedDB.

## Features

- ✅ **Full CRUD** - Create, read, update, and delete notes
- ✅ **Offline Storage** - IndexedDB (no localStorage)
- ✅ **Auto-Save** - 800ms debounce after typing
- ✅ **Search** - Real-time search across title, content, and tags
- ✅ **Sort** - By created date or last modified
- ✅ **Dark Mode** - Light/dark theme with persistence
- ✅ **Export** - Download all notes as JSON
- ✅ **Responsive** - Desktop and mobile optimized
- ✅ **Tags** - Organize notes with comma-separated tags

## Tech Stack

- **Angular 19** - Standalone components
- **TypeScript 5.6** - Full type safety
- **IndexedDB** - Browser database (via `idb` library)
- **RxJS 7.8** - Reactive programming
- **SCSS** - CSS with variables for theming

## Prerequisites

- Node.js v18+
- npm v9+

## Installation

```bash
# Install dependencies
npm install

# Start development server
npm start
```

Open `http://localhost:4200` in your browser.

## Project Structure

```
src/app/
├── components/
│   ├── sidebar/          # Search, sort, notes list
│   ├── editor/           # Note editor with auto-save
│   └── note-item/        # Note preview card
├── services/
│   └── indexeddb.service.ts  # Database operations
├── models/
│   └── note.model.ts         # TypeScript interfaces
└── app.component.ts          # Root component
```

## Database Schema

**Database:** notesDB  
**Store:** notes  
**Indexes:** title, updatedAt, createdAt, tags (multiEntry)

```typescript
interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}
```

## Usage

### Creating Notes
1. Click **"New Note"** button
2. Enter title, tags (comma-separated), and content
3. Saves automatically after you stop typing

### Searching
- Type in search bar to filter by title, content, or tags
- Results update in real-time (300ms debounce)

### Sorting
- Use dropdown to sort by created/modified date

### Dark Mode
- Click sun/moon icon in header to toggle theme
- Preference persists across sessions

### Export
- Click download icon (bottom-right) to export all notes as JSON

## Development Commands

```bash
npm start      # Start dev server
npm run build  # Production build
npm test       # Run tests
```

## Build for Production

```bash
npm run build
```

Output: `dist/notevault/` - ready for deployment.

## License

MIT

---

**Built with ❤️ using Angular 19**
