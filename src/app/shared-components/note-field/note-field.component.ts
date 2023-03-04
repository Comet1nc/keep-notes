import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Note, NoteCategory } from 'src/app/models/note.model';
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
export class NoteFieldComponent implements OnInit {
  @Input() note!: Note;
  @Input() inArchive = false;
  @Input() inBin = false;
  @Input() fromCategory!: NoteCategory;
  @Output() onTogglePin = new EventEmitter<Note>();
  @Output() onDeleteNote = new EventEmitter<Note>();

  showButtons = false;
  mouseInNote = false;
  editModeOpened = false;
  moreOptionsActive = false;

  constructor(
    private notesService: NotesService,
    private editNoteService: EditNoteService,
    private archiveService: ArchiveService,
    private binService: BinService
  ) {}

  ngOnInit(): void {
    this.editNoteService.onCloseEditMode.subscribe(
      () => (this.editModeOpened = false)
    );
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

  onMouseEnter() {
    this.showButtons = true;
    this.mouseInNote = true;
  }

  onMouseLeave() {
    this.showButtons = false;
    this.mouseInNote = false;
    this.moreOptionsActive = false;
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
