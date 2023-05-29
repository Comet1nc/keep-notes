import { animate, style, transition, trigger } from '@angular/animations';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { DrawService } from 'src/app/main-components/draw/draw.service';
import { Note, NoteCategory } from 'src/app/models/note.model';
import { AppService, Theme } from 'src/app/services/app.service';
import { CustomNotesService } from 'src/app/services/custom-notes.service';
import { NotesService } from 'src/app/services/notes.service';
import { EditNoteService } from '../edit-note/edit-note.service';
import { noteColors } from 'src/app/models/note-colors.model';

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
export class NoteFieldComponent implements OnInit, AfterViewInit {
  @Input() note!: Note;
  @Input() inBin = false;
  @Input() inCustom = false;
  @Input() fromCategory!: NoteCategory;
  @Output() onTogglePin = new EventEmitter<Note>();

  @ViewChild('noteRef') noteRef!: ElementRef<HTMLElement>;

  showButtons = false;
  mouseInNote = false;
  editModeOpened = false;
  moreOptionsActive = false;
  changeBgMenuActive = false;
  currentTheme: Theme = Theme.light;

  colors = noteColors;

  constructor(
    private notesService: NotesService,
    private editNoteService: EditNoteService,
    private renderer: Renderer2,
    private appService: AppService,
    private drawService: DrawService,
    private customNotesService: CustomNotesService
  ) {}

  ngAfterViewInit(): void {
    this.changeBg(this.noteRef.nativeElement);

    this.appService.onThemeChanged.subscribe((theme) => {
      this.currentTheme = theme;

      this.changeBg(this.noteRef.nativeElement);
    });

    this.editNoteService.onBgChanged.subscribe(() => {
      this.changeBg(this.noteRef.nativeElement);
    });
  }

  ngOnInit(): void {
    this.editNoteService.onCloseEditMode.subscribe(
      () => (this.editModeOpened = false)
    );
  }

  draw() {
    this.drawService.openDraw.next();
  }

  setBg(color: any, noteRef: HTMLElement) {
    this.note.color = color;
    if (this.inCustom) {
      this.customNotesService.saveToLocalStorage();
    } else {
      this.notesService.saveToLocalStorage();
    }
    this.changeBg(noteRef);
  }

  changeBg(noteRef: HTMLElement) {
    if (this.note.color !== undefined) {
      this.renderer.setStyle(
        noteRef,
        'background-color',
        this.currentTheme === Theme.light
          ? this.note.color.valueLightTheme
          : this.note.color.valueDarkTheme
      );
    } else {
      this.renderer.removeStyle(noteRef, 'background-color');
    }
  }

  toggleMenu() {
    this.moreOptionsActive = !this.moreOptionsActive;
  }

  toggleBgMenu() {
    this.changeBgMenuActive = !this.changeBgMenuActive;
  }

  togglePin() {
    this.onTogglePin.emit(this.note);
  }

  openEditMode() {
    if (this.mouseInNote) {
      this.editNoteService.openEditMode(this.note);
      this.editModeOpened = true;
    }
  }

  onMouseEnter(noteRef: HTMLElement) {
    this.showButtons = true;
    this.mouseInNote = true;
    // this.renderer.setStyle(noteRef, 'z-index', '10');
  }

  onMouseLeave(noteRef: HTMLElement) {
    if (this.changeBgMenuActive) return;

    this.showButtons = false;
    this.mouseInNote = false;
    this.moreOptionsActive = false;
    this.renderer.setStyle(noteRef, 'z-index', '0');
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
