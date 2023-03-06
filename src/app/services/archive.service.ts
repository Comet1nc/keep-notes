import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Note, NoteCategory } from 'src/app/models/note.model';
import { LocalStorageService } from './local-storage.service';

@Injectable()
export class ArchiveService {
  unArchiveNote = new Subject<Note>();

  onNotesChanged = new Subject<void>();
  filled = false;

  myCategory: NoteCategory = NoteCategory.archive;

  notesContainer: Note[] = [];

  constructor(private localStorageService: LocalStorageService) {
    this.onNotesChanged.subscribe(() => {
      this.saveToLocalStorage();
    });
  }

  getNotesForSearch() {
    return this.notesContainer;
  }

  loadDataFromLocalStorage() {
    let notes = this.localStorageService.getData(this.myCategory);
    if (notes === null) return;

    let parsed: Note[] = JSON.parse(notes);
    this.notesContainer = [...parsed];
    this.filled = true;
  }

  saveToLocalStorage() {
    let notes = JSON.stringify(this.notesContainer);
    this.localStorageService.saveData(this.myCategory, notes);
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

    this.saveToLocalStorage();
  }

  saveNewNote(note: Note) {
    this.notesContainer.push(note);

    this.saveToLocalStorage();
  }

  changeNote(note: Note) {
    let noteIndex = this.notesContainer.indexOf(note);
    this.notesContainer[noteIndex] = note;

    this.saveToLocalStorage();
  }
}
