import { Component, Input } from '@angular/core';
import { Note } from '../input-bar/input-bar.component';

@Component({
  selector: 'app-note-field',
  templateUrl: './note-field.component.html',
  styleUrls: ['./note-field.component.scss'],
})
export class NoteFieldComponent {
  @Input() note!: Note;
}
