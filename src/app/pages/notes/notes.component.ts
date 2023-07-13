import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/models/note.model';
import { EditNoteService } from 'src/app/shared-components/edit-note/edit-note.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as notesActions from '../../store/notes-store/notes.actions';
import * as archivedNotesActions from '../../store/archive-store/archive.actions';
import * as deletedNotesActions from '../../store/bin-store/bin.actions';
import { Observable, combineLatest, map, take } from 'rxjs';
import { NoteColor } from 'src/app/models/note-colors.model';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent implements OnInit {
  pinnedNotes$ = this.store.select('notes').pipe(
    map((state) => {
      return state.notes.filter((note: Note) => note.isPinned);
    })
  );

  notes$ = this.store.select('notes').pipe(
    map((state) => {
      return state.notes.filter((note: Note) => !note.isPinned);
    })
  );

  showEditMode = false;
  noteForEdit$: Observable<Note>;
  noteForEdit: Note;

  constructor(
    private store: Store<fromApp.AppState>,
    private editNoteService: EditNoteService
  ) {}

  ngOnInit(): void {}

  startEditNote(noteId: string) {
    this.noteForEdit$ = this.store.select('notes').pipe(
      map((state) => {
        this.noteForEdit = state.notes.find((note) => note.id === noteId);
        return this.noteForEdit;
      })
    );
    this.showEditMode = true;
  }

  setNoteColor(color: NoteColor, noteId: string) {
    this.store.dispatch(new notesActions.UpdateNoteColor({ noteId, color }));
    this.store.dispatch(new notesActions.StoreNotes());
  }

  addLabel(label: string, noteId: string) {
    this.store.dispatch(new notesActions.AddLabelToNote({ noteId, label }));
    this.store.dispatch(new notesActions.StoreNotes());
  }

  deleteLabel(label: string, noteId: string) {
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
    note.createdAt = new Date();

    this.store.dispatch(new notesActions.AddNote(note));

    this.store.dispatch(new notesActions.StoreNotes());
  }

  updateNote(newNote: Note) {
    this.store.dispatch(
      new notesActions.UpdateNote({ id: this.noteForEdit.id, newNote })
    );
    this.store.dispatch(new notesActions.StoreNotes());

    this.showEditMode = false;
  }

  // !!! to rework
  // we filtering notes by isPinned property in streams, so we cannot use *ngFor index to correctly identify note in store.
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
