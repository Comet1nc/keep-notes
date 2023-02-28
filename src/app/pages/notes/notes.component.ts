import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/models/note.model';
import { NotesService } from 'src/app/services/notes.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent implements OnInit {
  pinnedNotes: Note[] = [];
  notes: Note[] = [];

  constructor(private notesService: NotesService) {}

  ngOnInit(): void {
    this.notes = this.notesService.notesContainer;
    this.pinnedNotes = this.notesService.notesContainerPinned;

    this.notesService.closeEditMode.subscribe((note: Note) => {
      this.notesService.changeNote(note);
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

  deleteNote(note: Note, _exitArray?: Note[]) {
    this.notesService.deleteNote(note, _exitArray);
  }

  saveNoteData(note: Note) {
    this.notesService.saveNewNote(note);
  }

  togglePin(note: Note) {
    this.notesService.togglePin(note);
  }
}
