import { Injectable } from '@angular/core';
import { Subject, merge } from 'rxjs';
import { Note, NoteCategory } from 'src/app/models/note.model';
import { ArchiveService } from './archive.service';
import { BinService } from './bin.service';
import { LocalStorageService } from './local-storage.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class NotesService {
  notesContainer: Note[] = [];
  notesContainerPinned: Note[] = [];
  onNotesChanged = new Subject<void>();

  filled = false;
  canSearch = false;

  myCategory!: NoteCategory;

  constructor(
    private archive: ArchiveService,
    private bin: BinService,
    private localStorageService: LocalStorageService,
    private http: HttpClient
  ) {
    archive.unArchiveNote.subscribe(this.restoreNoteFn);
    bin.restoreNote.subscribe(this.restoreNoteFn);

    this.onNotesChanged.subscribe(() => {
      // this.saveToLocalStorage();
      this.saveNotes();
    });
  }

  getNotesForSearch() {
    return [...this.notesContainer, ...this.notesContainerPinned];
  }

  restoreNoteFn = (note: Note) => {
    if (note.fromCategory === this.myCategory) {
      if (note.isPinned) {
        this.saveNewNoteToPinned(note);
      } else {
        this.saveNewNoteToUnpinned(note);
      }

      // this.saveToLocalStorage();
      this.saveNotes();
    }
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
      });

    this.http
      .get(
        'https://keep-notes-f33db-default-rtdb.europe-west1.firebasedatabase.app/notes.json?orderBy="isPinned"&equalTo=false'
      )
      .subscribe((notes) => {
        for (let note of Object.values(notes)) {
          this.notesContainer.push(note as Note);
        }
      });

    this.filled = true;
  }

  // loadDataFromLocalStorage() {
  //   let notes = this.localStorageService.getData(this.myCategory);
  //   if (notes === null) return;
  //   let parsed: Note[] = JSON.parse(notes);
  //   for (const note of parsed) {
  //     if (note.isPinned === true) {
  //       this.notesContainerPinned.push(note);
  //     } else {
  //       this.notesContainer.push(note);
  //     }
  //   }
  //   this.filled = true;
  // }

  deleteNote(note: Note, _exitArray?: Note[]) {
    let exitArray = _exitArray;

    if (exitArray !== undefined) {
      // skipping
    } else if (note.isPinned) {
      exitArray = this.notesContainerPinned;
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

    // this.saveToLocalStorage();
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

    // this.saveToLocalStorage();
    this.saveNotes();
  }

  saveNewNoteToPinned(note: Note) {
    this.notesContainerPinned.push(note);

    note.createdAt = new Date();
    note.fromCategory = this.myCategory;

    // this.saveToLocalStorage();
    this.saveNotes();
  }

  saveNewNoteToUnpinned(note: Note) {
    this.notesContainer.push(note);

    note.createdAt = new Date();
    note.fromCategory = this.myCategory;

    // this.saveToLocalStorage();
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

    // this.saveToLocalStorage();
    this.saveNotes();
  }

  // saveToLocalStorage() {
  //   let mergedNotes = JSON.stringify([
  //     ...this.notesContainer,
  //     ...this.notesContainerPinned,
  //   ]);

  //   this.localStorageService.saveData(this.myCategory, mergedNotes);
  // }

  saveNotes() {
    let mergedNotes = this.notesContainer.concat(this.notesContainerPinned);

    this.http
      .put(
        'https://keep-notes-f33db-default-rtdb.europe-west1.firebasedatabase.app/notes.json',
        mergedNotes
      )
      .subscribe(console.log);
    //
  }
}
