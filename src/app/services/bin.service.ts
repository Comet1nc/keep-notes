import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Note, NoteCategory } from 'src/app/models/note.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class BinService {
  restoreNote = new Subject<Note>();

  onNotesChanged = new Subject<void>();
  filled = false;

  notesContainer: Note[] = [];

  myCategory: NoteCategory = NoteCategory.bin;

  constructor(private http: HttpClient) {
    this.onNotesChanged.subscribe(() => {
      this.saveNotes();
    });
  }

  clear() {
    this.notesContainer = [];

    this.saveNotes();
  }

  getNotesForSearch() {
    return this.notesContainer;
  }

  deleteLabel(label: string, note: Note) {
    let index = note.labels.indexOf(label);
    note.labels.splice(index, 1);

    this.saveNotes();
  }

  loadData() {
    this.notesContainer = [];

    this.http
      .get(
        'https://keep-notes-f33db-default-rtdb.europe-west1.firebasedatabase.app/bin.json'
      )
      .subscribe((notes: any) => {
        for (let note of Object.values(notes)) {
          this.notesContainer.push(note as Note);
        }
      });

    this.filled = true;
  }

  saveNotes() {
    this.http
      .put(
        'https://keep-notes-f33db-default-rtdb.europe-west1.firebasedatabase.app/bin.json',
        this.notesContainer
      )
      .subscribe();
    //
  }

  deleteNote(note: Note, _exitArray?: Note[]) {
    let exitArray = _exitArray;

    if (exitArray !== undefined) {
      // skipping
    } else {
      exitArray = this.notesContainer;
    }

    let noteIndex = exitArray.indexOf(note);

    if (exitArray.length === 1) {
      exitArray.pop();
    } else if (noteIndex === 0) {
      exitArray.shift();
    } else if (noteIndex + 1 === exitArray.length) {
      exitArray.pop();
    } else {
      exitArray.splice(noteIndex, 1);
    }

    this.saveNotes();
  }

  saveNewNote(note: Note) {
    this.notesContainer.push(note);

    this.saveNotes();
  }

  changeNote(note: Note) {
    let noteIndex = this.notesContainer.indexOf(note);
    this.notesContainer[noteIndex] = note;

    this.saveNotes();
  }
}
