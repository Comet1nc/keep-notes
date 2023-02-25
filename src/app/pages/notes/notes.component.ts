import { Component, ElementRef, OnInit } from '@angular/core';
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
    this.notesService.closeEditMode.subscribe((note: Note) => {
      this.notes[note.index] = note;
    });
  }

  saveNoteData(data: Note) {
    this.notes.push(data);
  }

  makePinned(note: Note) {
    // let elementIndex = this.notes.indexOf(note);
    // this.notes = this.notes.splice(elementIndex);
  }
}
