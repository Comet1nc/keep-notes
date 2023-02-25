import {
  animate,
  animation,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Note } from 'src/app/models/note.model';
import { NotesService } from 'src/app/services/notes.service';

@Component({
  selector: 'app-note-field',
  templateUrl: './note-field.component.html',
  styleUrls: ['./note-field.component.scss'],
  animations: [
    trigger('icons', [
      transition(':enter', [
        style({
          opacity: '0',
        }),
        animate(
          '200ms ease-in',
          style({
            opacity: '1',
          })
        ),
      ]),
      transition(':leave', [
        style({
          opacity: '1',
        }),
        animate(
          '300ms ease-out',
          style({
            opacity: '0',
          })
        ),
      ]),
    ]),
  ],
})
export class NoteFieldComponent implements OnInit {
  @Input() note!: Note;
  @Input() index!: number;
  @Output() onMakePinned = new EventEmitter<Note>();
  @Output() onNoteChange = new EventEmitter<Note>();

  editmode = 'editmode';

  showButtons = false;
  mouseInNote = false;
  editModeOpened = false;

  constructor(private notesService: NotesService) {}

  makePinned() {
    this.onMakePinned.emit(this.note);
  }

  ngOnInit(): void {
    this.note.index = this.index;
    this.notesService.closeEditMode.subscribe((note) =>
      this.editModeClosed(note)
    );
  }

  editModeClosed(note: Note) {
    this.editModeOpened = false;

    // console.log(note);
    // if (note.index === this.index) {
    //   this.onNoteChange.emit(note);
    // }
  }

  openEditMode() {
    if (this.mouseInNote) {
      this.notesService.openEditMode.next(this.note);
      this.editModeOpened = true;
    }
  }

  onMouseEnter() {
    this.showButtons = true;
    this.mouseInNote = true;
  }

  onMouseLeave() {
    this.showButtons = false;
    this.mouseInNote = false;
  }

  getTitle() {
    let clearedText = this.note.title.trim();
    if (clearedText.length === 0) {
      return 'No title';
    }
    return clearedText;
  }

  getContent() {
    let clearedText = this.note.content.trim();
    if (clearedText.length === 0) {
      return '';
    }
    if (this.note.content.length > 45) {
      let slicedText = this.note.content.slice(0, 45);
      let textWithDots = slicedText + '...';
      return textWithDots;
    }
    return clearedText;
  }
}
