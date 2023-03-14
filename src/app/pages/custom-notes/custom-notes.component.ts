import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EditLabelsService } from 'src/app/main-components/edit-labels/edit-labels.service';
import { SearchBarService } from 'src/app/main-components/tool-bar/search-bar.service';
import { Note, NoteCategory } from 'src/app/models/note.model';
import { NotesService } from 'src/app/services/notes.service';
import { EditNoteService } from 'src/app/shared-components/edit-note/edit-note.service';

@Component({
  selector: 'app-custom-notes',
  templateUrl: './custom-notes.component.html',
  styleUrls: ['./custom-notes.component.scss'],
})
export class CustomNotesComponent implements OnInit, OnDestroy {
  pinnedNotes: Note[] = [];
  notes: Note[] = [];

  showEditMode = false;
  editModeNoteData!: Note;

  fromCategory = NoteCategory.custom;

  constructor(
    private notesService: NotesService,
    private editNoteService: EditNoteService,
    private searchBarService: SearchBarService,
    private activeRoute: ActivatedRoute,
    private labelsService: EditLabelsService
  ) {}

  ngOnInit(): void {
    this.editNoteService.onOpenEditMode.subscribe((note: Note) => {
      this.showEditMode = true;

      this.editModeNoteData = note;
    });

    this.editNoteService.onCloseEditMode.subscribe(() => {
      this.showEditMode = false;
    });

    let customLabelName =
      this.activeRoute.snapshot.children[0].children[0].params['name'];
    //

    let myLabel = this.labelsService.getLabelByName(customLabelName);
    this.notesService.notesContainer = myLabel.notes;
    this.notesService.notesContainerPinned = myLabel.notesPinned;

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
