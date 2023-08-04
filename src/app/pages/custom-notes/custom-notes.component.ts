import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, combineLatest, map } from 'rxjs';
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
export class CustomNotesComponent {
  notes$ = combineLatest([
    this.store.select('notes'),
    this.activeRoute.params.pipe(map((params: Params) => params['name'])),
  ]).pipe(
    map(([notesState, param]) => {
      this.label = param;
      return notesState.notes;
    })
  );

  label: string = '';
  showEditMode = false;
  noteForEdit$: Observable<Note>;
  noteForEdit: Note;

  constructor(
    private activeRoute: ActivatedRoute,
    private store: Store<fromApp.AppState>,
    private editNoteService: EditNoteService
  ) {}

  startEditNote(noteId: string) {
    this.noteForEdit$ = this.store.select('notes').pipe(
      map((state) => {
        this.noteForEdit = state.notes.find((note) => note.id === noteId);
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
  identify(index: number, item: Note) {
    return item.id;
  }
}
