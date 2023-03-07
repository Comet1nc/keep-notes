import { Component, OnDestroy, OnInit } from '@angular/core';
import { SearchBarService } from 'src/app/main-components/tool-bar/search-bar.service';
import { Note } from 'src/app/models/note.model';
import { ArchiveService } from 'src/app/services/archive.service';
import { EditNoteService } from 'src/app/shared-components/edit-note/edit-note.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss'],
})
export class ArchiveComponent implements OnInit {
  notes: Note[] = [];

  showEditMode = false;
  editModeNoteData!: Note;

  readonly isArchive = true;

  constructor(
    private editNoteService: EditNoteService,
    private archiveService: ArchiveService,
    private searchBarService: SearchBarService
  ) {}

  ngOnInit(): void {
    if (!this.archiveService.filled) {
      this.archiveService.loadDataFromLocalStorage();
    }

    this.editNoteService.onOpenEditMode.subscribe((note: Note) => {
      this.showEditMode = true;

      this.editModeNoteData = note;
    });

    this.editNoteService.onCloseEditMode.subscribe(() => {
      this.showEditMode = false;
    });

    this.notes = this.archiveService.notesContainer;

    // searching
    this.searchBarService.startSearch.subscribe(() => {
      this.notes = [];
    });

    this.searchBarService.endSearch.subscribe(() => {
      this.notes = this.archiveService.notesContainer;
    });

    this.searchBarService.newSearchResults.subscribe((notes) => {
      this.notes = notes;
    });

    this.searchBarService.notesServiceData = this.archiveService.notesContainer;
  }
}
