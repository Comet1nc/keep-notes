import { trigger, transition, style, animate } from '@angular/animations';
import {
  Component,
  OnInit,
  AfterViewInit,
  Input,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Note, NoteCategory } from 'src/app/models/note.model';
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

  @ViewChild('inputField') inputField!: ElementRef;

  @Input() activeNote!: Note;
  @Input() inArchive = false;
  @Input() inBin = false;
  @Input() fromCategory!: NoteCategory;

  constructor(
    private editNoteService: EditNoteService,
    private notesService: NotesService,
    private archiveService: ArchiveService,
    private binService: BinService
  ) {}

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

  ngAfterViewInit(): void {
    this.inputField.nativeElement.innerText = this.newNoteText;
  }

  input(e: any) {
    this.newNoteText = e.srcElement.innerText;
  }
}
