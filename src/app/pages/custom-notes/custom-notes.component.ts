import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { SearchBarService } from 'src/app/main-components/tool-bar/search-bar.service';
import { Note, NoteCategory } from 'src/app/models/note.model';
import { ArchiveService } from 'src/app/services/archive.service';
import { BinService } from 'src/app/services/bin.service';
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
  editModeNote!: Note;

  fromCategory = NoteCategory.custom;

  constructor(
    private notesService: CustomNotesService,
    private editNoteService: EditNoteService,
    private searchBarService: SearchBarService,
    private activeRoute: ActivatedRoute,
    private archiveService: ArchiveService,
    private binService: BinService
  ) {}

  ngOnInit(): void {
    this.editNoteService.onOpenEditMode.subscribe((note: Note) => {
      this.showEditMode = true;

      this.editModeNote = note;
    });

    this.editNoteService.onCloseEditMode.subscribe(() => {
      this.showEditMode = false;
    });

    //param from route
    let customLabelName = this.activeRoute.snapshot.params['name'];
    //
    this.getDataAndSetup(customLabelName);

    // subscribing to route changes
    this.activeRoute.params.subscribe((params: Params) => {
      let customLabelName = params['name'];
      //
      this.getDataAndSetup(customLabelName);
    });

    // searching
    this.searchBarSubscriptions();

    this.searchBarService.notesServiceData = this.notesService.notesContainer;
    this.searchBarService.notesServiceDataPinned =
      this.notesService.notesContainerPinned;
    //
  }

  searchBarSubscriptions() {
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
  }

  getDataAndSetup(customLabelName: string) {
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
  }

  archiveNote(note: Note) {
    this.notesService.deleteNote(note);
    note.fromCategory = this.fromCategory;
    this.archiveService.saveNewNote(note);
  }

  deleteNote(note: Note) {
    this.notesService.deleteNote(note);
    note.fromCategory = this.fromCategory;
    this.binService.saveNewNote(note);
  }

  togglePin(note: Note) {
    this.notesService.togglePin(note);
  }

  ngOnDestroy(): void {
    this.searchBarService.notesServiceData = [];
    this.searchBarService.notesServiceDataPinned = [];
  }

  saveNewNote(note: Note) {
    if (note.isPinned) {
      this.notesService.saveNewNoteToPinned(note);
    } else {
      this.notesService.saveNewNoteToUnpinned(note);
    }
  }

  notesChanged() {
    this.notesService.onNotesChanged.next();
  }

  saveNotesToLocalStorage() {
    this.notesService.saveToLocalStorage();
  }
}
