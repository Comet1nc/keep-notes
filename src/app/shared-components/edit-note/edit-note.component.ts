import { trigger, transition, style, animate } from '@angular/animations';
import {
  Component,
  OnInit,
  AfterViewInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Note } from 'src/app/models/note.model';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.scss'],
  animations: [
    trigger('note', [
      transition(':enter', [
        style({
          opacity: '0',
          transform: 'scale(0.5)',
        }),
        animate(
          '400ms ease-in-out',
          style({
            opacity: '1',
            transform: '*',
          })
        ),
      ]),
    ]),
    trigger('bg', [
      transition(':enter', [
        style({
          opacity: '0',
        }),
        animate(
          '400ms ease-in-out',
          style({
            opacity: '1',
          })
        ),
      ]),
    ]),
  ],
})
export class EditNoteComponent implements OnInit, AfterViewInit {
  @Input() activeNote!: Note;
  // @Input() noteIndex!: number;
  @Output() onCloseEditMode = new EventEmitter<Note>();

  titleText: string = '';
  newNoteText: string = '';

  @ViewChild('inputField') inputField!: ElementRef;

  ngOnInit(): void {
    this.titleText = this.activeNote.title;
    this.newNoteText = this.activeNote.content;
  }

  ngAfterViewInit(): void {
    this.inputField.nativeElement.innerText = this.newNoteText;
  }

  input(e: any) {
    this.newNoteText = e.srcElement.innerText;
  }

  closeEditMode() {
    // let note = new Note(this.titleText, this.newNoteText);
    // note.index = this.noteIndex;
    this.activeNote.title = this.titleText;
    this.activeNote.content = this.newNoteText;
    this.onCloseEditMode.emit(this.activeNote);

    this.activeNote = new Note('', '');
  }
}
