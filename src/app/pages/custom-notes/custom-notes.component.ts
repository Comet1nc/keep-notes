import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, combineLatest, map, take } from 'rxjs';
import { Note } from 'src/app/models/note.model';
import * as fromApp from '../../store/app.reducer';
import * as notesActions from '../../store/notes-store/notes.actions';
import * as archivedNotesActions from '../../store/archive-store/archive.actions';
import * as deletedNotesActions from '../../store/bin-store/bin.actions';
import { Store } from '@ngrx/store';
import { NoteColor } from 'src/app/models/note-colors.model';
import { EditNoteService } from 'src/app/shared-components/edit-note/edit-note.service';

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

  showEditMode = false;
  noteForEdit$: Observable<Note>;
  noteForEdit: Note;

  constructor(
    private activeRoute: ActivatedRoute,
    private store: Store<fromApp.AppState>,
    private editNoteService: EditNoteService
  ) {}

  ngOnInit(): void {}

  startEditNote(noteId: string) {
    this.noteForEdit$ = this.store.select('notes').pipe(
      map((state) => {
        this.noteForEdit = state.notes[noteId];
        return this.noteForEdit;
      })
    );
    this.showEditMode = true;
  }

  updateNote(newNote: Note) {
    this.store.dispatch(
      new notesActions.UpdateNote({ id: this.noteForEdit.id, newNote })
    );
    this.store.dispatch(new notesActions.StoreNotes());

    this.showEditMode = false;
  }

  setNoteColor(color: NoteColor, noteId: string) {
    this.store.dispatch(new notesActions.UpdateNoteColor({ noteId, color }));
    this.store.dispatch(new notesActions.StoreNotes());
  }

  addLabel(label: string, noteId: string) {
    this.store.dispatch(new notesActions.AddLabelToNote({ noteId, label }));
    this.store.dispatch(new notesActions.StoreNotes());
  }

  deleteLabelFromEditMode(label: string, noteId: string) {
    this.editNoteService.closeEditMode.next();
    this.deleteLabel(label, noteId);
  }

  deleteLabel(label: string, noteId: string): void {
    this.store.dispatch(
      new notesActions.DeleteLabelFromNote({ noteId, label })
    );
    this.store.dispatch(new notesActions.StoreNotes());
  }

  archiveNoteFromEditMode(noteId: string) {
    this.editNoteService.closeEditMode.next();
    this.archiveNote(this.noteForEdit, noteId);
  }

  archiveNote(note: Note, noteId: string) {
    this.store.dispatch(new archivedNotesActions.AddNote(note));
    this.store.dispatch(new notesActions.DeleteNote(noteId));

    this.store.dispatch(new archivedNotesActions.StoreNotes());
    this.store.dispatch(new notesActions.StoreNotes());
  }

  deleteNoteFromEditMode(noteId: string) {
    this.editNoteService.closeEditMode.next();
    this.deleteNote(this.noteForEdit, noteId);
  }

  deleteNote(note: Note, noteId: string) {
    this.store.dispatch(new deletedNotesActions.AddNote(note));
    this.store.dispatch(new notesActions.DeleteNote(noteId));

    this.store.dispatch(new deletedNotesActions.StoreNotes());
    this.store.dispatch(new notesActions.StoreNotes());
  }

  togglePin(noteId: string) {
    this.store.dispatch(new notesActions.TogglePinNote(noteId));
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

  // !!! to rework
  // we filtering notes by isPinned(and others) property in streams,
  // so we cannot use *ngFor index to correctly identify note in store.
  // also note does not have any identifier, like id
  indexOfNote(note: Note) {
    let index: number;
    this.store
      .select('notes')
      .pipe(take(1))
      .subscribe((state) => (index = state.notes.indexOf(note)));
    return index;
  }
}
