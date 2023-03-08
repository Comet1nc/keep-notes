import { animate, style, transition, trigger } from '@angular/animations';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Note, NoteCategory } from 'src/app/models/note.model';
import { NotesRoutingModule } from 'src/app/pages/notes/notes-routing.module';
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

  colors = [
    { name: 'red', value: '#F28B82' },
    { name: 'green', value: '#CCFF90' },
  ];

  constructor(
    private notesService: NotesService,
    private editNoteService: EditNoteService,
    private archiveService: ArchiveService,
    private binService: BinService,
    private renderer: Renderer2
  ) {}

  ngAfterViewInit(): void {
    this.changeBg(this.noteRef.nativeElement);
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
    console.log(this.note.color);

    if (this.note.color !== undefined) {
      this.renderer.setStyle(
        noteRef,
        'background-color',
        this.note.color.value
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
    this.renderer.setStyle(noteRef, 'z-index', '20');
  }

  onMouseLeave(noteRef: HTMLElement) {
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
