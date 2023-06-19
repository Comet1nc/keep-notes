import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Note, NoteCategory } from 'src/app/models/note.model';
import { ArchiveService } from './archive.service';
import { BinService } from './bin.service';
import { Label } from '../models/label.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CustomNotesService {
  labels: Label[] = [];
  notesContainer: Note[] = [];
  notesContainerPinned: Note[] = [];
  onNotesChanged = new Subject<void>();

  filled = false;
  canSearch = false;

  myCategory: NoteCategory = NoteCategory.custom;

  constructor(
    public archive: ArchiveService,
    public bin: BinService,
    private http: HttpClient
  ) {
    archive.unArchiveNote.subscribe(this.restoreNoteFn);
    bin.restoreNote.subscribe(this.restoreNoteFn);

    this.onNotesChanged.subscribe(() => {
      this.saveLabels();
    });
  }

  openEditLabels = new Subject<void>();

  addLabel(name: string) {
    if (this.labels.length >= 10) return;
    let newLabel = new Label(name);
    newLabel.notes = [];
    newLabel.notesPinned = [];
    this.labels.push(newLabel);
    this.saveLabels();
  }

  labelRenamed() {
    this.saveLabels();
    return;
  }

  getLabelByName(name: string) {
    for (let label of this.labels) {
      if (label.name === name) {
        return label;
      }
    }

    return new Label('');
  }

  deleteLabel(label: Label) {
    let index = this.labels.indexOf(label);

    if (this.labels.length === 1) {
      this.labels.pop();
    } else if (index === 0) {
      this.labels.shift();
    } else if (index + 1 === this.labels.length) {
      this.labels.pop();
    } else {
      this.labels.splice(index, 1);
    }

    this.saveLabels();
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

      this.saveLabels();
    }
  };

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

    this.saveLabels();
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

    this.saveLabels();
  }

  togglePinByOtherLable(note: Note) {
    let enterArray: Note[] = [];
    let exitArray: Note[] = [];

    if (note.isPinned) {
      for (let label of this.labels) {
        if (label.notesPinned.find((value: Note) => value === note)) {
          enterArray = label.notes;
          exitArray = label.notesPinned;
        }
      }

      note.isPinned = false;
    } else {
      for (let label of this.labels) {
        if (label.notes.find((value: Note) => value === note)) {
          enterArray = label.notesPinned;
          exitArray = label.notes;
        }
      }

      note.isPinned = true;
    }

    enterArray.push(note);

    this.deleteNote(note, exitArray);

    this.saveLabels();
  }

  saveNewNoteToPinned(note: Note) {
    this.notesContainerPinned.push(note);

    note.createdAt = new Date();
    note.fromCategory = this.myCategory;

    this.saveLabels();
  }

  saveNewNoteToUnpinned(note: Note) {
    this.notesContainer.push(note);

    note.createdAt = new Date();
    note.fromCategory = this.myCategory;

    this.saveLabels();
  }

  changeNote(note: Note) {
    if (!note.isPinned) {
      let noteIndex = this.notesContainer.indexOf(note);
      this.notesContainer[noteIndex] = note;
    } else {
      let noteIndex = this.notesContainerPinned.indexOf(note);
      this.notesContainerPinned[noteIndex] = note;
    }

    this.saveLabels();
  }

  loadData() {
    this.http
      .get(
        'https://keep-notes-f33db-default-rtdb.europe-west1.firebasedatabase.app/labels.json'
      )
      .subscribe((labels: any) => {
        for (let label of Object.values(labels)) {
          this.labels.push(label as Label);
        }
      });
    //

    this.filled = true;
  }

  saveLabels() {
    this.http
      .put(
        'https://keep-notes-f33db-default-rtdb.europe-west1.firebasedatabase.app/labels.json',
        this.labels
      )
      .subscribe();
    //
  }
}
