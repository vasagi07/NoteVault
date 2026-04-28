import { Injectable } from '@angular/core';
import { openDB, IDBPDatabase } from 'idb';
import { Observable, from, of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { Note } from '../models/note.model';

@Injectable({
  providedIn: 'root'
})
export class IndexedDBService {
  private dbName = 'notesDB';
  private storeName = 'notes';
  private dbVersion = 1;
  private db: IDBPDatabase<any> | null = null;

  constructor() {
    this.initDB();
  }

  private async initDB(): Promise<void> {
    this.db = await openDB(this.dbName, this.dbVersion, {
      upgrade(db) {
        // Create object store if it doesn't exist
        if (!db.objectStoreNames.contains('notes')) {
          const store = db.createObjectStore('notes', { keyPath: 'id' });
          
          // Create indexes
          store.createIndex('title', 'title');
          store.createIndex('updatedAt', 'updatedAt');
          store.createIndex('createdAt', 'createdAt');
          store.createIndex('tags', 'tags', { multiEntry: true });
        }
      },
    });
  }

  private async getDB(): Promise<IDBPDatabase<any>> {
    if (!this.db) {
      await this.initDB();
    }
    return this.db!;
  }

  /**
   * Add a new note to IndexedDB
   * @param note - The note object to add
   * @returns Observable of the added note
   */
  addNote(note: Note): Observable<Note> {
    return from(this.getDB().then(async (db) => {
      // Ensure dates are stored as ISO strings for IndexedDB compatibility
      const noteToStore = {
        ...note,
        createdAt: note.createdAt.toISOString(),
        updatedAt: note.updatedAt.toISOString()
      };
      await db.add(this.storeName, noteToStore);
      return note;
    }).catch(error => {
      console.error('Error adding note:', error);
      throw error;
    }));
  }

  /**
   * Update an existing note in IndexedDB
   * @param note - The note object to update
   * @returns Observable of the updated note
   */
  updateNote(note: Note): Observable<Note> {
    return from(this.getDB().then(async (db) => {
      // Ensure dates are stored as ISO strings
      const noteToStore = {
        ...note,
        createdAt: note.createdAt.toISOString(),
        updatedAt: note.updatedAt.toISOString()
      };
      await db.put(this.storeName, noteToStore);
      return note;
    }).catch(error => {
      console.error('Error updating note:', error);
      throw error;
    }));
  }

  /**
   * Delete a note from IndexedDB
   * @param id - The ID of the note to delete
   * @returns Observable of the deleted note ID
   */
  deleteNote(id: string): Observable<string> {
    return from(this.getDB().then(async (db) => {
      await db.delete(this.storeName, id);
      return id;
    }).catch(error => {
      console.error('Error deleting note:', error);
      throw error;
    }));
  }

  /**
   * Get all notes from IndexedDB
   * @returns Observable of array of notes with proper Date objects
   */
  getAllNotes(): Observable<Note[]> {
    return from(this.getDB().then(async (db) => {
      const notes = await db.getAll(this.storeName);
      // Convert ISO date strings back to Date objects
      return notes.map(note => ({
        ...note,
        createdAt: new Date(note.createdAt),
        updatedAt: new Date(note.updatedAt)
      })).sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
    }).catch(error => {
      console.error('Error getting all notes:', error);
      return [];
    }));
  }

  /**
   * Get a specific note by ID
   * @param id - The ID of the note
   * @returns Observable of the note or undefined
   */
  getNoteById(id: string): Observable<Note | undefined> {
    return from(this.getDB().then(async (db) => {
      const note = await db.get(this.storeName, id);
      if (note) {
        // Convert ISO date strings back to Date objects
        return {
          ...note,
          createdAt: new Date(note.createdAt),
          updatedAt: new Date(note.updatedAt)
        };
      }
      return undefined;
    }).catch(error => {
      console.error('Error getting note by id:', error);
      return undefined;
    }));
  }

  /**
   * Search notes by title, content, or tags
   * @param searchTerm - The search term
   * @returns Observable of filtered notes
   */
  searchNotes(searchTerm: string): Observable<Note[]> {
    return this.getAllNotes().pipe(
      map(notes => {
        if (!searchTerm.trim()) {
          return notes;
        }
        
        const term = searchTerm.toLowerCase().trim();
        return notes.filter(note => {
          const titleMatch = note.title.toLowerCase().includes(term);
          const contentMatch = note.content.toLowerCase().includes(term);
          const tagsMatch = note.tags.some(tag => tag.toLowerCase().includes(term));
          return titleMatch || contentMatch || tagsMatch;
        });
      })
    );
  }
}