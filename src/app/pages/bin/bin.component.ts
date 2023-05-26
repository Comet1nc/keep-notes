import { Component } from '@angular/core';
import { SearchBarService } from 'src/app/main-components/tool-bar/search-bar.service';
import { Note } from 'src/app/models/note.model';
import { BinService } from 'src/app/services/bin.service';
import { EditNoteService } from 'src/app/shared-components/edit-note/edit-note.service';

@Component({
  selector: 'app-bin',
  templateUrl: './bin.component.html',
  styleUrls: ['./bin.component.scss'],
})
export class BinComponent {
  notes: Note[] = [];

  showEditMode = false;
  editModeNoteData!: Note;

  readonly isBin = true;

  constructor(
    private editNoteService: EditNoteService,
    private binService: BinService,
    private searchBarService: SearchBarService
  ) {}

  ngOnInit(): void {
    if (!this.binService.filled) {
      this.binService.loadDataFromLocalStorage();
    }

    this.editNoteService.onOpenEditMode.subscribe((note: Note) => {
      this.showEditMode = true;

      this.editModeNoteData = note;
    });

    this.editNoteService.onCloseEditMode.subscribe(() => {
      this.showEditMode = false;
    });

    this.notes = this.binService.notesContainer;

    // searching
    this.searchBarSubscriptions();

    this.searchBarService.notesServiceData = this.binService.notesContainer;
  }

  searchBarSubscriptions() {
    this.searchBarService.startSearch.subscribe(() => {
      this.notes = [];
    });

    this.searchBarService.endSearch.subscribe(() => {
      this.notes = this.binService.notesContainer;
    });

    this.searchBarService.newSearchResults.subscribe((notes) => {
      this.notes = notes;
    });
  }

  clearBin() {
    this.notes = [];
    this.binService.clear();
  }

  notesChanged() {
    this.binService.onNotesChanged.next();
  }
}
