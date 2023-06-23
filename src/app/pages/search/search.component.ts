import { Component, OnInit } from '@angular/core';
import { SearchService } from './search.service';
import { Note } from 'src/app/models/note.model';
import { ArchiveService } from 'src/app/services/archive.service';
import { BinService } from 'src/app/services/bin.service';
import { NotesService } from 'src/app/services/notes.service';
import { EditNoteService } from 'src/app/shared-components/edit-note/edit-note.service';

@Component({
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  notes: Note[] = [];
  archiveNotes: Note[] = [];

  constructor(
    private searchService: SearchService,
    private notesService: NotesService,
    private editNoteService: EditNoteService,
    private archiveService: ArchiveService,
    private binService: BinService
  ) {}

  ngOnInit(): void {
    this.searchService.notesResult.subscribe((notes: Note[]) => {
      this.notes = notes;
    });

    this.searchService.archiveNotesResult.subscribe((notes: Note[]) => {
      this.archiveNotes = notes;
    });
  }

  archiveNote(note: Note) {
    this.notesService.deleteNote(note);

    this.archiveService.saveNewNote(note);

    this.searchService.search(this.searchService.lastSearchText);
  }

  deleteNote(note: Note) {
    this.notesService.deleteNote(note);

    this.binService.saveNewNote(note);

    this.searchService.search(this.searchService.lastSearchText);
  }

  togglePin(note: Note) {
    this.notesService.togglePin(note);
  }

  saveNotesToLocalStorage() {
    this.notesService.saveNotes();
  }

  saveNotesToLocalStorageFromArchive() {
    this.archiveService.saveNotes();
  }

  unarchive(note: Note) {
    this.archiveService.deleteNote(note);
    this.archiveService.unArchiveNote.next(note);

    this.searchService.search(this.searchService.lastSearchText);
  }

  deleteNoteFromArchive(note: Note) {
    this.archiveService.deleteNote(note);
    this.binService.saveNewNote(note);

    this.searchService.search(this.searchService.lastSearchText);
  }
}
