import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { NotesService } from 'src/app/services/notes.service';
import { Note } from '../input-bar/input-bar.component';
import {
  animate,
  animation,
  group,
  style,
  transition,
  trigger,
} from '@angular/animations';

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
      transition(':leave', [
        style({
          opacity: '1',
          transform: '*',
        }),
        animate(
          '200ms ease-in-out',
          style({
            transform: 'scale(0.5)',
          })
        ),
        group([
          animate(
            '100ms',
            style({
              transform: 'scale(0)',
            })
          ),
          animate(
            '100ms',
            style({
              opacity: '0',
            })
          ),
        ]),
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
      transition(':leave', [
        style({
          opacity: '1',
        }),
        animate(
          '400ms ease-in-out',
          style({
            opacity: '0',
          })
        ),
      ]),
    ]),
  ],
})
export class EditNoteComponent implements OnInit, AfterViewInit {
  @Input() activeNote!: Note;
  @Output() onCloseEditMode = new EventEmitter<Note>();

  titleText: string = '';
  newNoteText: string = '';

  @ViewChild('inputField') inputField!: ElementRef;

  constructor(private notesService: NotesService) {}

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
    this.activeNote = new Note('', '');
    this.onCloseEditMode.emit(new Note(this.titleText, this.newNoteText));
  }
}
