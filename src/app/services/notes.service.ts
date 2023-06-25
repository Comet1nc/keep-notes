import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Note } from 'src/app/models/note.model';
import { ArchiveService } from './archive.service';
import { BinService } from './bin.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class NotesService {
  notesContainer: Note[] = [];
  notesContainerPinned: Note[] = [];
  newNotesArrived = new Subject<void>();

  filled = false;
  canSearch = false;

  constructor(
    private archive: ArchiveService,
    private bin: BinService,
    private http: HttpClient
  ) {
    archive.unArchiveNote.subscribe(this.restoreNoteFn);
    bin.restoreNote.subscribe(this.restoreNoteFn);
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
    return [...this.notesContainer, ...this.notesContainerPinned];
  }

  restoreNoteFn = (note: Note) => {
    if (note.isPinned) {
      this.saveNewNoteToPinned(note);
    } else {
      this.saveNewNoteToUnpinned(note);
    }

    this.saveNotes();
  };

  loadData() {
    this.http
      .get(
        'https://keep-notes-f33db-default-rtdb.europe-west1.firebasedatabase.app/notes.json?orderBy="isPinned"&equalTo=true'
      )
      .subscribe((notes: any) => {
        for (let note of Object.values(notes)) {
          this.notesContainerPinned.push(note as Note);
        }

        this.newNotesArrived.next();
      });

    this.http
      .get(
        'https://keep-notes-f33db-default-rtdb.europe-west1.firebasedatabase.app/notes.json?orderBy="isPinned"&equalTo=false'
      )
      .subscribe((notes) => {
        for (let note of Object.values(notes)) {
          this.notesContainer.push(note as Note);
        }

        this.newNotesArrived.next();
      });

    this.filled = true;
  }

  deleteNote(note: Note, exitArray?: Note[]) {
    if (!exitArray) {
      if (note.isPinned) {
        exitArray = this.notesContainerPinned;
      } else {
        exitArray = this.notesContainer;
      }
    }

    let noteIndex = exitArray.indexOf(note);
    exitArray.splice(noteIndex, 1);

    this.saveNotes();
  }

  togglePin(note: Note) {
    let enterArray;
    let exitArray;

    if (note.isPinned) {
      enterArray = this.notesContainer;
      exitArray = this.notesContainerPinned;

      note.isPinned = false;
    } else {
      enterArray = this.notesContainerPinned;
      exitArray = this.notesContainer;

      note.isPinned = true;
    }

    enterArray.push(note);

    this.deleteNote(note, exitArray);

    this.saveNotes();
  }

  saveNewNoteToPinned(note: Note) {
    this.notesContainerPinned.push(note);

    note.createdAt = new Date();

    this.saveNotes();
  }

  saveNewNoteToUnpinned(note: Note) {
    this.notesContainer.push(note);

    note.createdAt = new Date();

    this.saveNotes();
  }

  changeNote(note: Note) {
    if (!note.isPinned) {
      let noteIndex = this.notesContainer.indexOf(note);
      this.notesContainer[noteIndex] = note;
    } else {
      let noteIndex = this.notesContainerPinned.indexOf(note);
      this.notesContainerPinned[noteIndex] = note;
    }

    this.saveNotes();
  }

  saveNotes() {
    let mergedNotes = this.notesContainer.concat(this.notesContainerPinned);

    this.http
      .put(
        'https://keep-notes-f33db-default-rtdb.europe-west1.firebasedatabase.app/notes.json',
        mergedNotes
      )
      .subscribe();
    //
  }
}
