import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/models/note.model';
import { ArchiveService } from 'src/app/services/archive.service';
import { BinService } from 'src/app/services/bin.service';
import { EditNoteService } from 'src/app/shared-components/edit-note/edit-note.service';
import { SearchService } from '../search/search.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss'],
})
export class ArchiveComponent implements OnInit {
  notes: Note[] = [];

  showEditMode = false;
  editModeNote!: Note;

  readonly isArchive = true;

  constructor(
    private editNoteService: EditNoteService,
    private archiveService: ArchiveService,
    private searchService: SearchService,
    private binService: BinService
  ) {}

  ngOnInit(): void {
    if (!this.archiveService.filled) {
      this.archiveService.loadData();
    }

    this.editNoteService.onOpenEditMode.subscribe((note: Note) => {
      this.showEditMode = true;

      this.editModeNote = note;
    });

    this.editNoteService.onCloseEditMode.subscribe(() => {
      this.showEditMode = false;
    });

    this.notes = this.archiveService.notesContainer;
  }

  deleteNote(note: Note) {
    this.archiveService.deleteNote(note);
    this.binService.saveNewNote(note);
  }

  notesChanged() {
    this.archiveService.onNotesChanged.next();
  }

  unarchive(note: Note) {
    this.archiveService.deleteNote(note);
    this.archiveService.unArchiveNote.next(note);
  }

  saveNotesToLocalStorage() {
    this.archiveService.saveNotes();
  }
}
