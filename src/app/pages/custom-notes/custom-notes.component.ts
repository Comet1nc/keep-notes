import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { SearchBarService } from 'src/app/main-components/tool-bar/search-bar.service';
import { Note, NoteCategory } from 'src/app/models/note.model';
import { CustomNotesService } from 'src/app/services/custom-notes.service';
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
    private notesService: CustomNotesService,
    private editNoteService: EditNoteService,
    private searchBarService: SearchBarService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.editNoteService.onOpenEditMode.subscribe((note: Note) => {
      this.showEditMode = true;

      this.editModeNoteData = note;
    });

    this.editNoteService.onCloseEditMode.subscribe(() => {
      this.showEditMode = false;
    });

    let customLabelName = this.activeRoute.snapshot.params['name'];

    let myLabel = this.notesService.getLabelByName(customLabelName);
    this.notesService.notesContainer = myLabel.notes;
    this.notesService.notesContainerPinned = myLabel.notesPinned;

    this.notes = this.notesService.notesContainer;
    this.pinnedNotes = this.notesService.notesContainerPinned;

    this.notesService.myCategory = this.fromCategory;

    if (!this.notesService.filled) {
      this.notesService.loadDataFromLocalStorage();
    }

    for (let index = 0; index < this.notesService.labels.length; index++) {
      if (this.notesService.labels[index].name === customLabelName) {
        this.notesService.currentLabelIndex = index;
      }
    }

    // subscribing to route changes
    this.activeRoute.params.subscribe((params: Params) => {
      let customLabelName = params['name'];
      let myLabel = this.notesService.getLabelByName(customLabelName);

      this.notesService.notesContainer = myLabel.notes;
      this.notesService.notesContainerPinned = myLabel.notesPinned;

      this.notes = this.notesService.notesContainer;
      this.pinnedNotes = this.notesService.notesContainerPinned;

      for (let index = 0; index < this.notesService.labels.length; index++) {
        if (this.notesService.labels[index].name === customLabelName) {
          this.notesService.currentLabelIndex = index;
        }
      }
    });

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
