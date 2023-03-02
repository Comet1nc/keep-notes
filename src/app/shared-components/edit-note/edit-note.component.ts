import { trigger, transition, style, animate } from '@angular/animations';
import {
  Component,
  OnInit,
  AfterViewInit,
  Input,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Note } from 'src/app/models/note.model';
import { NotesService } from 'src/app/services/notes.service';
import { EditNoteService } from './edit-note.service';

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

  titleText: string = '';
  newNoteText: string = '';

  @ViewChild('inputField') inputField!: ElementRef;

  constructor(
    private editNoteService: EditNoteService,
    private notesService: NotesService
  ) {}

  ngOnInit(): void {
    this.titleText = this.activeNote.title;
    this.newNoteText = this.activeNote.content;
  }

  closeEditMode() {
    this.editNoteService.onCloseEditMode.next();

    this.activeNote.title = this.titleText;
    this.activeNote.content = this.newNoteText;
  }

  ngAfterViewInit(): void {
    this.inputField.nativeElement.innerText = this.newNoteText;
  }

  input(e: any) {
    this.newNoteText = e.srcElement.innerText;
  }
}
