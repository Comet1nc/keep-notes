import { Component, OnDestroy, OnInit } from '@angular/core';
import { SearchBarService } from 'src/app/main-components/tool-bar/search-bar.service';
import { Note, NoteCategory } from 'src/app/models/note.model';
import { NotesService } from 'src/app/services/notes.service';
import { EditNoteService } from 'src/app/shared-components/edit-note/edit-note.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent implements OnInit, OnDestroy {
  pinnedNotes: Note[] = [];
  notes: Note[] = [];

  showEditMode = false;
  editModeNoteData!: Note;

  fromCategory = NoteCategory.notes;

  constructor(
    private notesService: NotesService,
    private editNoteService: EditNoteService,
    private searchBarService: SearchBarService
  ) {}

  ngOnInit(): void {
    this.editNoteService.onOpenEditMode.subscribe((note: Note) => {
      this.showEditMode = true;

      this.editModeNoteData = note;
    });

    this.editNoteService.onCloseEditMode.subscribe(() => {
      this.showEditMode = false;
    });

    this.notes = this.notesService.notesContainer;
    this.pinnedNotes = this.notesService.notesContainerPinned;

    this.notesService.myCategory = this.fromCategory;

    if (!this.notesService.filled) {
      this.notesService.loadDataFromLocalStorage();
    }

    // searching
    this.searchBarService.startSearch.subscribe(() => {
      this.notes = [];
      this.pinnedNotes = [];
    });

    this.searchBarService.endSearch.subscribe(() => {
      this.notes = this.notesService.notesContainer;
      this.pinnedNotes = this.notesService.notesContainerPinned;
    });

    this.searchBarService.newSearchResults.subscribe((notes) => {
      this.notes = notes;
    });

    this.searchBarService.notesServiceData = this.notesService.notesContainer;
    this.searchBarService.notesServiceDataPinned =
      this.notesService.notesContainerPinned;
    //
  }

  ngOnDestroy(): void {
    this.searchBarService.notesServiceData = [];
    this.searchBarService.notesServiceDataPinned = [];
  }
}
