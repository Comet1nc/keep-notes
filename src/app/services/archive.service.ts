import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Note } from 'src/app/models/note.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ArchiveService {
  unArchiveNote = new Subject<Note>();

  onNotesChanged = new Subject<void>();
  filled = false;

  notesContainer: Note[] = [];

  constructor(private http: HttpClient) {
    this.onNotesChanged.subscribe(() => {
      this.saveNotes();
    });
  }

  addLabel(label: string, note: Note) {
    if (!note.labels) {
      note.labels = [];
    }
    note.labels.push(label);

    this.saveNotes();
  }

  deleteLabel(label: string, note: Note) {
    let index = note.labels.indexOf(label);
    note.labels.splice(index, 1);

    this.saveNotes();
  }

  getNotesForSearch() {
    return this.notesContainer;
  }

  loadData() {
    this.http
      .get(
        'https://keep-notes-f33db-default-rtdb.europe-west1.firebasedatabase.app/archived-notes.json'
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
        'https://keep-notes-f33db-default-rtdb.europe-west1.firebasedatabase.app/archived-notes.json',
        this.notesContainer
      )
      .subscribe();
    //
  }

  deleteNote(note: Note, exitArray?: Note[]) {
    if (!exitArray) {
      exitArray = this.notesContainer;
    }

    let noteIndex = exitArray.indexOf(note);
    exitArray.splice(noteIndex, 1);

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
