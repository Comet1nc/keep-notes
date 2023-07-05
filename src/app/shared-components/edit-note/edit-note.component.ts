import { trigger, transition, style, animate } from '@angular/animations';
import {
  Component,
  OnInit,
  AfterViewInit,
  Input,
  ViewChild,
  ElementRef,
  Renderer2,
  Output,
  EventEmitter,
} from '@angular/core';
import { Note } from 'src/app/models/note.model';
import { AppService, Theme } from 'src/app/services/app.service';
import { EditNoteService } from './edit-note.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';

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
  @ViewChild('noteRef') noteRef!: ElementRef<HTMLElement>;
  @ViewChild('inputField') inputField!: ElementRef;

  @Input() activeNote!: Note;
  @Input() canEditNote = false;
  @Input() store: Store<fromApp.AppState>;

  @Output() onNotesChanged = new EventEmitter<void>();
  @Output() saveNotesToLocalStorage = new EventEmitter<void>();

  currentTheme: Theme = Theme.light;

  titleText: string = '';
  newNoteText: string = '';
  createdAt: string = '';

  constructor(
    private editNoteService: EditNoteService,
    private renderer: Renderer2,
    private appService: AppService
  ) {}

  ngOnInit(): void {
    this.titleText = this.activeNote.title;
    this.newNoteText = this.activeNote.content;
  }

  ngAfterViewInit(): void {
    this.renderer.setProperty(
      this.inputField.nativeElement,
      'innerText',
      this.newNoteText
    );

    this.changeBg(this.noteRef.nativeElement);

    this.appService.onThemeChanged.subscribe((theme) => {
      this.currentTheme = theme;

      this.changeBg(this.noteRef.nativeElement);
    });

    this.editNoteService.onBgChanged.subscribe(() => {
      this.changeBg(this.noteRef.nativeElement);
    });
  }

  changeBg(noteRef: HTMLElement) {
    if (this.activeNote.color !== undefined) {
      this.renderer.setStyle(
        noteRef,
        'background-color',
        this.currentTheme === Theme.light
          ? this.activeNote.color.valueLightTheme
          : this.activeNote.color.valueDarkTheme
      );
    } else {
      this.renderer.removeStyle(noteRef, 'background-color');
    }
  }

  closeEditMode() {
    this.editNoteService.onCloseEditMode.next();

    this.activeNote.title = this.titleText;
    this.activeNote.content = this.newNoteText;
    this.activeNote.lastEditAt = new Date();

    this.onNotesChanged.emit();
  }

  input(e: any) {
    this.newNoteText = e.srcElement.innerText;
  }
}
