import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { combineLatest, filter, map, tap } from 'rxjs';
import { Note } from 'src/app/models/note.model';
import { ArchiveService } from 'src/app/services/archive.service';
import { BinService } from 'src/app/services/bin.service';
import { NotesService } from 'src/app/services/notes.service';
import { EditNoteService } from 'src/app/shared-components/edit-note/edit-note.service';
import * as fromApp from '../../store/app.reducer';
import * as notesActions from '../../store/notes-store/notes.actions';
import { Store } from '@ngrx/store';
import { NoteColor } from 'src/app/models/note-colors.model';

@Component({
  selector: 'app-custom-notes',
  templateUrl: './custom-notes.component.html',
  styleUrls: ['./custom-notes.component.scss'],
})
export class CustomNotesComponent implements OnInit {
  pinnedNotes: Note[] = [];
  notes: Note[] = [];

  pinnedNotes$ = combineLatest([
    this.activeRoute.params.pipe(map((params: Params) => params['name'])),
    this.store.select('notes'),
  ]).pipe(
    map(([paramName, notesState]) => {
      return notesState.notes.filter(
        (note: Note) =>
          note.isPinned &&
          note.labels &&
          note.labels.find((label) => label === paramName)
      );
    })
  );

  notes$ = combineLatest([
    this.activeRoute.params.pipe(map((params: Params) => params['name'])),
    this.store.select('notes'),
  ]).pipe(
    map(([paramName, notesState]) => {
      return notesState.notes.filter(
        (note: Note) =>
          !note.isPinned &&
          note.labels &&
          note.labels.find((label) => label === paramName)
      );
    })
  );

  showEditMode = false;
  editModeNote!: Note;

  constructor(
    private notesService: NotesService,
    private editNoteService: EditNoteService,
    private activeRoute: ActivatedRoute,
    private archiveService: ArchiveService,
    private binService: BinService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.editNoteService.onOpenEditMode.subscribe((note: Note) => {
      this.showEditMode = true;

      this.editModeNote = note;
    });

    this.editNoteService.onCloseEditMode.subscribe(() => {
      this.showEditMode = false;
    });

    // this.customLabelName = this.activeRoute.snapshot.params['name'];

    // if (!this.notesService.filled) {
    //   this.notesService.loadData();
    // }

    // this.notes$.subscribe(console.log);

    // this.getDataAndSetup(this.customLabelName);

    // subscribing to route changes
    // this.activeRoute.params.subscribe((params: Params) => {
    //   this.customLabelName = params['name'];
    //   //
    //   this.getDataAndSetup(this.customLabelName);
    // });

    // this.notesService.newNotesArrived.subscribe(() =>
    //   this.getDataAndSetup(this.customLabelName)
    // );
  }

  // getDataAndSetup(customLabelName: string) {
  //   this.notes.splice(0);
  //   this.pinnedNotes.splice(0);

  //   for (let note of this.notesService.notesContainer) {
  //     if (!note.labels) continue;
  //     if (note.labels.find((value: string) => value === customLabelName)) {
  //       this.notes.push(note);
  //     }
  //   }

  //   for (let note of this.notesService.notesContainerPinned) {
  //     if (!note.labels) continue;
  //     if (note?.labels.find((value: string) => value === customLabelName)) {
  //       this.pinnedNotes.push(note);
  //     }
  //   }
  // }

  setNoteColor(color: NoteColor, noteIndex: number) {
    this.store.dispatch(new notesActions.UpdateNoteColor({ noteIndex, color }));

    this.store.dispatch(new notesActions.StoreNotes());
  }

  addLabel(label: string, noteIndex: number) {
    // this.notesService.addLabel(label, note);

    this.store.dispatch(new notesActions.AddLabelToNote({ noteIndex, label }));

    this.store.dispatch(new notesActions.StoreNotes());
  }

  deleteLabel(label: string, noteIndex: number) {
    // this.notesService.deleteLabel(event, note);

    this.store.dispatch(
      new notesActions.DeleteLabelFromNote({ noteIndex, label })
    );

    this.store.dispatch(new notesActions.StoreNotes());

    // this.getDataAndSetup(this.customLabelName);
  }

  archiveNote(note: Note) {
    this.notesService.deleteNote(note);
    this.archiveService.saveNewNote(note);

    // this.getDataAndSetup(this.customLabelName);
  }

  deleteNote(note: Note) {
    this.notesService.deleteNote(note);
    this.binService.saveNewNote(note);

    // this.getDataAndSetup(this.customLabelName);
  }

  togglePin(noteIndex: number) {
    // this.notesService.togglePin(note);

    this.store.dispatch(new notesActions.TogglePinNote(noteIndex));

    this.store.dispatch(new notesActions.StoreNotes());

    // this.getDataAndSetup(this.customLabelName);
  }

  saveNewNote(note: Note) {
    // if (note.isPinned) {
    //   this.notesService.saveNewNoteToPinned(note);
    // } else {
    //   this.notesService.saveNewNoteToUnpinned(note);
    // }

    const newLabel: string = this.activeRoute.snapshot.params['name'];

    if (newLabel !== '') {
      note.labels.push(newLabel);
    }

    note.createdAt = new Date();

    this.store.dispatch(new notesActions.AddNote(note));

    this.store.dispatch(new notesActions.StoreNotes());

    // this.getDataAndSetup(this.customLabelName);
  }

  notesChanged() {
    this.notesService.saveNotes();
  }

  saveNotes() {
    this.notesService.saveNotes();
  }
}
