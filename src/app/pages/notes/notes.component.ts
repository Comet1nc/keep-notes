import { Component, ElementRef } from '@angular/core';
import { Note } from 'src/app/shared-components/input-bar/input-bar.component';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent {
  notes: Note[] = [];

  saveNoteData(data: Note) {
    this.notes.push(data);
  }
}
