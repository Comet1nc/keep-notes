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
  noteForEditIndex!: number;

  constructor(
    private store: Store<fromApp.AppState>,
    private editNoteService: EditNoteService
  ) {}

  ngOnInit(): void {}

  startEditNote(noteIndex: number) {
    this.noteForEdit$ = this.store.select('notes').pipe(
      map((state) => {
        this.noteForEdit = state.notes[noteIndex];
        return this.noteForEdit;
      })
    );
    this.noteForEditIndex = noteIndex;
    this.showEditMode = true;
  }

  setNoteColor(color: NoteColor, noteIndex: number) {
    this.store.dispatch(new notesActions.UpdateNoteColor({ noteIndex, color }));
    this.store.dispatch(new notesActions.StoreNotes());
  }

  addLabel(label: string, noteIndex: number) {
    this.store.dispatch(new notesActions.AddLabelToNote({ noteIndex, label }));
    this.store.dispatch(new notesActions.StoreNotes());
  }

  deleteLabel(label: string, noteIndex: number) {
    this.store.dispatch(
      new notesActions.DeleteLabelFromNote({ noteIndex, label })
    );
    this.store.dispatch(new notesActions.StoreNotes());
  }

  archiveNoteFromEditMode(noteIndex: number) {
    this.editNoteService.closeEditMode.next();
    this.archiveNote(this.noteForEdit, noteIndex);
  }

  archiveNote(note: Note, noteIndex: number) {
    this.store.dispatch(new archivedNotesActions.AddNote(note));
    this.store.dispatch(new notesActions.DeleteNote(noteIndex));

    this.store.dispatch(new archivedNotesActions.StoreNotes());
    this.store.dispatch(new notesActions.StoreNotes());
  }

  deleteNoteFromEditMode(noteIndex: number) {
    this.editNoteService.closeEditMode.next();
    this.deleteNote(this.noteForEdit, noteIndex);
  }

  deleteNote(note: Note, noteIndex: number) {
    this.store.dispatch(new deletedNotesActions.AddNote(note));
    this.store.dispatch(new notesActions.DeleteNote(noteIndex));

    this.store.dispatch(new deletedNotesActions.StoreNotes());
    this.store.dispatch(new notesActions.StoreNotes());
  }

  togglePin(noteIndex: number) {
    this.store.dispatch(new notesActions.TogglePinNote(noteIndex));
    this.store.dispatch(new notesActions.StoreNotes());
  }

  saveNewNote(note: Note) {
    note.createdAt = new Date();

    this.store.dispatch(new notesActions.AddNote(note));

    this.store.dispatch(new notesActions.StoreNotes());
  }

  updateNote(newNote: Note) {
    this.store.dispatch(
      new notesActions.UpdateNote({ index: this.noteForEditIndex, newNote })
    );
    this.store.dispatch(new notesActions.StoreNotes());

    this.showEditMode = false;
  }

  indexOfNote(note: Note | Observable<Note>) {
    let index: number;

    if (note instanceof Observable) {
      combineLatest([this.store.select('notes'), note])
        .pipe(take(1))
        .subscribe(([state, note]) => {
          index = state.notes.indexOf(note);
        });
    } else {
      this.store
        .select('notes')
        .pipe(take(1))
        .subscribe((state) => (index = state.notes.indexOf(note)));
    }

    return index;
  }
}
