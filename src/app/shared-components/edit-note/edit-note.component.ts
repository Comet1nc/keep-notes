import { trigger, transition, style, animate } from '@angular/animations';
import {
  Component,
  OnInit,
  AfterViewInit,
  Input,
  ViewChild,
  ElementRef,
  Renderer2,
} from '@angular/core';
import { DrawService } from 'src/app/main-components/draw/draw.service';
import { Note, NoteCategory } from 'src/app/models/note.model';
import { AppService, Theme } from 'src/app/services/app.service';
import { ArchiveService } from 'src/app/services/archive.service';
import { BinService } from 'src/app/services/bin.service';
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
  @Input() fromCategory!: NoteCategory;

  colors = [
    { name: 'red', valueLightTheme: '#F28B82', valueDarkTheme: '#5C2B29' },
    { name: 'green', valueLightTheme: '#CCFF90', valueDarkTheme: '#345920' },
    { name: 'yellow', valueLightTheme: '#FFF475', valueDarkTheme: '#635D19' },
    { name: 'teal', valueLightTheme: '#A7FFEB', valueDarkTheme: '#16504B' },
    { name: 'blue', valueLightTheme: '#AECBFA', valueDarkTheme: '#1E3A5F' },
    { name: 'purple', valueLightTheme: '#D7AEFB', valueDarkTheme: '#42275E' },
  ];

  constructor(
    private editNoteService: EditNoteService,
    private notesService: NotesService,
    private archiveService: ArchiveService,
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
    this.notesService.saveToLocalStorage();
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
    if (this.inArchive) {
      this.archiveService.deleteNote(this.activeNote);

      this.archiveService.unArchiveNote.next(this.activeNote);
    } else {
      this.notesService.deleteNote(this.activeNote);
      this.activeNote.fromCategory = this.fromCategory;

      this.archiveService.saveNewNote(this.activeNote);
    }

    this.closeEditMode();
  }

  deleteNote() {
    if (this.inArchive) {
      this.archiveService.deleteNote(this.activeNote);
    } else {
      this.notesService.deleteNote(this.activeNote);
      this.activeNote.fromCategory = this.fromCategory;
    }

    this.binService.saveNewNote(this.activeNote);

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
    if (this.inArchive) return;
    this.notesService.togglePin(this.activeNote);
  }

  closeEditMode() {
    this.editNoteService.onCloseEditMode.next();

    this.activeNote.title = this.titleText;
    this.activeNote.content = this.newNoteText;
    this.activeNote.lastEditAt = new Date();

    if (this.inArchive) {
      this.archiveService.onNotesChanged.next();
    } else if (this.inBin) {
      this.binService.onNotesChanged.next();
    } else {
      this.notesService.onNotesChanged.next();
    }
  }

  input(e: any) {
    this.newNoteText = e.srcElement.innerText;
  }
}
