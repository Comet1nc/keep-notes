import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Note } from 'src/app/models/note.model';
import { AppService, Theme } from 'src/app/services/app.service';
import {
  Observable,
  Subscription,
  combineLatest,
  delay,
  map,
  startWith,
} from 'rxjs';
import { EditNoteService } from '../edit-note/edit-note.service';

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
  @Output() onDeleteLabel = new EventEmitter<string>();
  @Output() startEditNote = new EventEmitter<void>();

  showButtons = false;
  mouseInNote = false;

  bg$: Observable<string>;

  subs: Subscription[] = [];

  constructor(
    private appService: AppService,
    private editNoteService: EditNoteService
  ) {}

  ngOnInit(): void {
    this.bg$ = combineLatest([
      this.appService.appTheme$,
      this.editNoteService.onBgChanged.pipe(startWith(0)),
    ]).pipe(
      delay(0),
      map(([theme]) => {
        if (this.note && this.note.color) {
          return theme === Theme.light
            ? this.note.color.valueLightTheme
            : this.note.color.valueDarkTheme;
        } else {
          return '';
        }
      })
    );
  }

  deleteLabel(label: string) {
    this.onDeleteLabel.emit(label);
  }

  openEditMode() {
    if (this.mouseInNote) {
      this.startEditNote.emit();
    }
  }

  onMouseEnter(noteRef: HTMLElement) {
    this.showButtons = true;
    this.mouseInNote = true;
  }

  onMouseLeave(noteRef: HTMLElement) {
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
