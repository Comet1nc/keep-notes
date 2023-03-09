import { animate, style, transition, trigger } from '@angular/animations';
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Note, NoteCategory } from 'src/app/models/note.model';
import { NotesRoutingModule } from 'src/app/pages/notes/notes-routing.module';
import { AppService, Theme } from 'src/app/services/app.service';
import { ArchiveService } from 'src/app/services/archive.service';
import { BinService } from 'src/app/services/bin.service';
import { NotesService } from 'src/app/services/notes.service';
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
export class NoteFieldComponent implements OnInit, AfterViewInit {
  @Input() note!: Note;
  @Input() inArchive = false;
  @Input() inBin = false;
  @Input() fromCategory!: NoteCategory;

  @ViewChild('noteRef') noteRef!: ElementRef<HTMLElement>;

  showButtons = false;
  mouseInNote = false;
  editModeOpened = false;
  moreOptionsActive = false;
  changeBgMenuActive = false;
  currentTheme: Theme = Theme.light;

  colors = [
    { name: 'red', valueLightTheme: '#F28B82', valueDarkTheme: '#5C2B29' },
    { name: 'green', valueLightTheme: '#CCFF90', valueDarkTheme: '#345920' },
    { name: 'yellow', valueLightTheme: '#FFF475', valueDarkTheme: '#635D19' },
    { name: 'teal', valueLightTheme: '#A7FFEB', valueDarkTheme: '#16504B' },
    { name: 'blue', valueLightTheme: '#AECBFA', valueDarkTheme: '#1E3A5F' },
    { name: 'purple', valueLightTheme: '#D7AEFB', valueDarkTheme: '#42275E' },
  ];

  constructor(
    private notesService: NotesService,
    private editNoteService: EditNoteService,
    private archiveService: ArchiveService,
    private binService: BinService,
    private renderer: Renderer2,
    private appService: AppService
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

  setBg(color: any, noteRef: HTMLElement) {
    this.note.color = color;
    this.notesService.saveToLocalStorage();
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

  toggleArchive() {
    if (this.inArchive) {
      this.archiveService.deleteNote(this.note);

      this.archiveService.unArchiveNote.next(this.note);
    } else {
      this.notesService.deleteNote(this.note);
      this.note.fromCategory = this.fromCategory;

      this.archiveService.saveNewNote(this.note);
    }
  }

  deleteNote() {
    if (this.inArchive) {
      this.archiveService.deleteNote(this.note);
    } else {
      this.notesService.deleteNote(this.note);
      this.note.fromCategory = this.fromCategory;
    }

    this.binService.saveNewNote(this.note);
  }

  deleteForever() {
    this.binService.deleteNote(this.note);
  }

  restoreFromBin() {
    this.binService.deleteNote(this.note);

    this.binService.restoreNote.next(this.note);
  }

  toggleMenu() {
    this.moreOptionsActive = !this.moreOptionsActive;
  }

  toggleBgMenu() {
    this.changeBgMenuActive = !this.changeBgMenuActive;
  }

  togglePin() {
    if (this.inArchive) return;
    this.notesService.togglePin(this.note);
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
    this.renderer.setStyle(noteRef, 'z-index', '10');
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
