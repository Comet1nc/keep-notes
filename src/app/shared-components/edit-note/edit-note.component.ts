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
import { DrawService } from 'src/app/main-components/draw/draw.service';
import { Note, NoteCategory } from 'src/app/models/note.model';
import { AppService, Theme } from 'src/app/services/app.service';
import { BinService } from 'src/app/services/bin.service';
import { EditNoteService } from './edit-note.service';
import { noteColors } from 'src/app/models/note-colors.model';

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
  titleText: string = '';
  newNoteText: string = '';
  createdAt: string = '';

  moreOptionsActive = false;

  changeBgMenuActive = false;
  currentTheme: Theme = Theme.light;

  @ViewChild('noteRef') noteRef!: ElementRef<HTMLElement>;
  @ViewChild('inputField') inputField!: ElementRef;

  @Input() activeNote!: Note;
  @Input() inArchive = false;
  @Input() inBin = false;
  @Input() inCustom = false;
  @Input() fromCategory!: NoteCategory;

  @Output() onNotesChanged = new EventEmitter<void>();
  @Output() onToggleArchive = new EventEmitter<Note>();
  @Output() onDeleteNote = new EventEmitter<Note>();
  @Output() onTogglePin = new EventEmitter<Note>();
  @Output() saveNotesToLocalStorage = new EventEmitter<void>();

  colors = noteColors;

  constructor(
    private editNoteService: EditNoteService,
    private binService: BinService,
    private renderer: Renderer2,
    private appService: AppService,
    private drawService: DrawService
  ) {}

  ngAfterViewInit(): void {
    this.inputField.nativeElement.innerText = this.newNoteText;

    this.changeBg(this.noteRef.nativeElement);

    this.appService.onThemeChanged.subscribe((theme) => {
      this.currentTheme = theme;

      this.changeBg(this.noteRef.nativeElement);
    });
  }

  draw() {
    this.drawService.openDraw.next();
  }

  setBg(color: any, noteRef: HTMLElement) {
    this.activeNote.color = color;

    this.saveNotesToLocalStorage.emit();

    this.changeBg(noteRef);
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

    this.editNoteService.onBgChanged.next();
  }

  toggleBgMenu() {
    this.changeBgMenuActive = !this.changeBgMenuActive;
  }

  ngOnInit(): void {
    this.titleText = this.activeNote.title;
    this.newNoteText = this.activeNote.content;
  }

  toggleMenu() {
    this.moreOptionsActive = !this.moreOptionsActive;
  }

  toggleArchive() {
    this.onToggleArchive.emit(this.activeNote);

    this.closeEditMode();
  }

  deleteNote() {
    this.onDeleteNote.emit(this.activeNote);

    this.closeEditMode();
  }

  deleteForever() {
    this.binService.deleteNote(this.activeNote);

    this.closeEditMode();
  }

  restoreFromBin() {
    this.binService.deleteNote(this.activeNote);

    this.binService.restoreNote.next(this.activeNote);

    this.closeEditMode();
  }

  togglePin() {
    this.onTogglePin.emit(this.activeNote);
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
