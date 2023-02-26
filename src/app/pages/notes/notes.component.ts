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
  onNotesChanged = new Subject<void>();
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
  }

  saveNoteData(data: Note) {
    this.notes.push(data);
  }

  makePinned(note: Note) {
    let noteIndex = this.notes.indexOf(note);

    this.pinnedNotes.push(note);

    if (this.notes.length === 1) {
      this.notes.pop();
    } else if (noteIndex === 0) {
      this.notes.shift();
    } else if (noteIndex + 1 === this.notes.length) {
      this.notes.pop();
    } else {
      this.notes.splice(noteIndex, 1);
    }

    this.onNotesChanged.next();
  }
}
