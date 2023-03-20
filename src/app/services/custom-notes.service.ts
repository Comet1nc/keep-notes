import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Note, NoteCategory } from 'src/app/models/note.model';
import { ArchiveService } from './archive.service';
import { BinService } from './bin.service';
import { LocalStorageService } from './local-storage.service';

@Injectable()
export class CustomNotesService {
  labels: Label[] = [new Label('custom')];
  currentLabelIndex!: number;
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

  openEditLabels = new Subject<void>();

  addLabel(name: string) {
    if (this.labels.length >= 10) return;
    this.labels.push(new Label(name));
    this.saveToLocalStorage(this.labels.length);
  }

  labelRenamed() {
    this.saveToLocalStorage();
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

    this.localStorageService.removeItem(NoteCategory.custom + index.toString());
  }

  getNotesForSearch() {
    return [...this.notesContainer, ...this.notesContainerPinned];
  }

  restoreNoteFn = (note: Note) => {
    if (note.fromCategory === this.myCategory) {
      if (note.isPinned) {
        this.saveNewNoteToPinned(note);
      } else {
        this.saveNewNote(note);
      }

      this.saveToLocalStorage();
    }
  };

  loadDataFromLocalStorage() {
    for (let index = 0; index < 10; index++) {
      let notes = this.localStorageService.getData(
        NoteCategory.custom + index.toString()
      );

      if (notes === null || notes === undefined) return;

      let parsed: any[] = JSON.parse(notes);
      this.labels[index] = new Label(parsed[0]);
      parsed.shift();
      for (const note of parsed) {
        if (note.isPinned === false) {
          this.labels[index].notes.push(note);
        } else {
          this.labels[index].notesPinned.push(note);
        }
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

  saveNewNote(note: Note) {
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

  saveToLocalStorage(labelIndex?: number) {
    if (labelIndex === undefined) {
      labelIndex = this.currentLabelIndex;
    } else {
      labelIndex = labelIndex - 1;
    }
    let notes = this.labels[labelIndex].notes;
    let notesPinned = this.labels[labelIndex].notesPinned;

    let mergedNotes = JSON.stringify([
      this.labels[labelIndex].name,
      ...notes,
      ...notesPinned,
    ]);

    this.localStorageService.saveData(
      NoteCategory.custom + labelIndex.toString(),
      mergedNotes
    );
  }
}

export class Label {
  name: string;
  notes: Note[] = [];
  notesPinned: Note[] = [];
  storageIndex!: string;

  constructor(private _name: string) {
    this.name = _name;
  }
}
