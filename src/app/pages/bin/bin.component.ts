import { Component } from '@angular/core';
import { Note } from 'src/app/models/note.model';
import { BinService } from 'src/app/services/bin.service';
import { EditNoteService } from 'src/app/shared-components/edit-note/edit-note.service';
import { SearchService } from '../search/search.service';

@Component({
  selector: 'app-bin',
  templateUrl: './bin.component.html',
  styleUrls: ['./bin.component.scss'],
})
export class BinComponent {
  notes: Note[] = [];

  showEditMode = false;
  editModeNote!: Note;

  readonly canEditNote = false;

  constructor(
    private editNoteService: EditNoteService,
    private binService: BinService,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    if (!this.binService.filled) {
      this.binService.loadData();
    }

    this.editNoteService.onOpenEditMode.subscribe((note: Note) => {
      this.showEditMode = true;

      this.editModeNote = note;
    });

    this.editNoteService.onCloseEditMode.subscribe(() => {
      this.showEditMode = false;
    });

    this.notes = this.binService.notesContainer;
  }

  deleteLabel(event: string, note: Note) {
    this.binService.deleteLabel(event, note);
  }

  clearBin() {
    this.notes = [];
    this.binService.clear();
  }

  notesChanged() {
    this.binService.onNotesChanged.next();
  }

  deleteForever(note: Note) {
    this.binService.deleteNote(note);
  }

  restoreFromBin(note: Note) {
    this.binService.deleteNote(note);

    this.binService.restoreNote.next(note);
  }
}
