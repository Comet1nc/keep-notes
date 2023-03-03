import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Note } from 'src/app/models/note.model';

@Injectable()
export class ArchiveService {
  unArchiveNote = new Subject<Note>();

  notesContainer: Note[] = [];
  filled = false;

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
  }

  saveNewNote(note: Note) {
    this.notesContainer.push(note);
  }

  changeNote(note: Note) {
    let noteIndex = this.notesContainer.indexOf(note);
    this.notesContainer[noteIndex] = note;
  }
}
