import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Note, NoteCategory } from 'src/app/models/note.model';
import { NotesService } from 'src/app/services/notes.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent implements OnInit {
  pinnedNotes: Note[] = [];
  notes: Note[] = [];
  categoryType: NoteCategory = NoteCategory.notes;

  constructor(private notesService: NotesService) {}

  ngOnInit(): void {
    this.notes = this.notesService.notesContainer;
    this.pinnedNotes = this.notesService.notesContainerPinned;

    this.notesService.closeEditMode.subscribe((note: Note) => {
      if (note.fromCategory === this.categoryType) {
        if (!note.isPinned) {
          this.notes[note.index] = note;
        } else {
          this.pinnedNotes[note.index] = note;
        }
      }
    });

    // filling db with some data for testing
    let count = 0;
    for (let index = 0; index < 3; index++) {
      count++;
      let item = new Note(count.toString(), 'Hello world');
      this.notesService.notesContainer.push(item);
      let pinned = new Note(count.toString(), 'Hello world');
      pinned.isPinned = true;
      this.notesService.notesContainerPinned.push(pinned);
    }
  }

  deleteNote(note: Note, _exitArray?: any) {
    let exitArray = _exitArray;

    if (exitArray !== undefined) {
      // skip
    } else if (note.isPinned) {
      exitArray = this.pinnedNotes;
    } else {
      exitArray = this.notes;
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

  saveNoteData(data: Note) {
    this.notes.push(data);
  }

  togglePin(note: Note) {
    let enterArray;
    let exitArray;

    if (note.isPinned) {
      enterArray = this.notes;
      exitArray = this.pinnedNotes;

      note.isPinned = false;
    } else {
      enterArray = this.pinnedNotes;
      exitArray = this.notes;

      note.isPinned = true;
    }

    enterArray.push(note);

    this.deleteNote(note, exitArray);
  }
}
