import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Note, NoteCategory } from 'src/app/models/note.model';
import { ArchiveService } from './archive.service';
import { BinService } from './bin.service';
import { LocalStorageService } from './local-storage.service';

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
    private localStorageService: LocalStorageService
  ) {
    archive.unArchiveNote.subscribe(this.restoreNoteFn);
    bin.restoreNote.subscribe(this.restoreNoteFn);

    this.onNotesChanged.subscribe(() => {
      this.saveToLocalStorage();
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

      this.saveToLocalStorage();
    }
  };

  loadDataFromLocalStorage() {
    let notes = this.localStorageService.getData(this.myCategory);
    if (notes === null) return;
    let parsed: Note[] = JSON.parse(notes);
    for (const note of parsed) {
      if (note.isPinned === true) {
        this.notesContainerPinned.push(note);
      } else {
        this.notesContainer.push(note);
      }
    }
    this.filled = true;
  }

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

    this.saveToLocalStorage();
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

    this.saveToLocalStorage();
  }

  saveNewNoteToPinned(note: Note) {
    this.notesContainerPinned.push(note);

    note.createdAt = new Date();

    this.saveToLocalStorage();
  }

  saveNewNoteToUnpinned(note: Note) {
    this.notesContainer.push(note);

    note.createdAt = new Date();

    this.saveToLocalStorage();
  }

  changeNote(note: Note) {
    if (!note.isPinned) {
      let noteIndex = this.notesContainer.indexOf(note);
      this.notesContainer[noteIndex] = note;
    } else {
      let noteIndex = this.notesContainerPinned.indexOf(note);
      this.notesContainerPinned[noteIndex] = note;
    }

    this.saveToLocalStorage();
  }

  saveToLocalStorage() {
    let mergedNotes = JSON.stringify([
      ...this.notesContainer,
      ...this.notesContainerPinned,
    ]);

    this.localStorageService.saveData(this.myCategory, mergedNotes);
  }
}
