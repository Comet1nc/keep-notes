import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { combineLatest, map } from 'rxjs';
import { Note } from 'src/app/models/note.model';
import * as fromApp from '../../store/app.reducer';
import * as notesActions from '../../store/notes-store/notes.actions';
import * as archivedNotesActions from '../../store/archive-store/archive.actions';
import * as deletedNotesActions from '../../store/bin-store/bin.actions';
import { Store } from '@ngrx/store';
import { NoteColor } from 'src/app/models/note-colors.model';

@Component({
  selector: 'app-custom-notes',
  templateUrl: './custom-notes.component.html',
  styleUrls: ['./custom-notes.component.scss'],
})
export class CustomNotesComponent implements OnInit {
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

  notes: Note[] = [];

  showEditMode = false;
  noteForEdit!: Note;

  constructor(
    private activeRoute: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.store.select('notes').subscribe((notesState) => {
      this.notes = notesState.notes;
    });
  }

  startEditNote(note: Note) {
    this.noteForEdit = note;
    this.showEditMode = true;
  }

  updateNote(newNote: Note) {
    let noteForEditIndex = this.notes.indexOf(this.noteForEdit);

    this.store.dispatch(
      new notesActions.UpdateNote({ index: noteForEditIndex, newNote })
    );
    this.store.dispatch(new notesActions.StoreNotes());

    this.showEditMode = false;
  }

  setNoteColor(color: NoteColor, note: Note) {
    let noteIndex = this.notes.indexOf(note);
    this.store.dispatch(new notesActions.UpdateNoteColor({ noteIndex, color }));
    this.store.dispatch(new notesActions.StoreNotes());
  }

  addLabel(label: string, note: Note) {
    let noteIndex = this.notes.indexOf(note);
    this.store.dispatch(new notesActions.AddLabelToNote({ noteIndex, label }));
    this.store.dispatch(new notesActions.StoreNotes());
  }

  deleteLabel(label: string, note: Note) {
    let noteIndex = this.notes.indexOf(note);
    this.store.dispatch(
      new notesActions.DeleteLabelFromNote({ noteIndex, label })
    );
    this.store.dispatch(new notesActions.StoreNotes());
  }

  archiveNote(note: Note) {
    let noteIndex = this.notes.indexOf(note);
    this.store.dispatch(new archivedNotesActions.AddNote(note));
    this.store.dispatch(new notesActions.DeleteNote(noteIndex));

    this.store.dispatch(new archivedNotesActions.StoreNotes());
    this.store.dispatch(new notesActions.StoreNotes());
  }

  deleteNote(note: Note) {
    let noteIndex = this.notes.indexOf(note);
    this.store.dispatch(new deletedNotesActions.AddNote(note));
    this.store.dispatch(new notesActions.DeleteNote(noteIndex));

    this.store.dispatch(new deletedNotesActions.StoreNotes());
    this.store.dispatch(new notesActions.StoreNotes());
  }

  togglePin(note: Note) {
    let noteIndex = this.notes.indexOf(note);
    this.store.dispatch(new notesActions.TogglePinNote(noteIndex));
    this.store.dispatch(new notesActions.StoreNotes());
  }

  saveNewNote(note: Note) {
    const newLabel: string = this.activeRoute.snapshot.params['name'];

    if (newLabel !== '') {
      note.labels.push(newLabel);
    }

    note.createdAt = new Date();

    this.store.dispatch(new notesActions.AddNote(note));

    this.store.dispatch(new notesActions.StoreNotes());
  }
}
