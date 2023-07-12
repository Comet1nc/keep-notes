import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/models/note.model';
import { EditNoteService } from 'src/app/shared-components/edit-note/edit-note.service';
import * as archivedNotesActions from '../../store/archive-store/archive.actions';
import * as notesActions from '../../store/notes-store/notes.actions';
import * as deletedNotesActions from '../../store/bin-store/bin.actions';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { NoteColor } from 'src/app/models/note-colors.model';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss'],
})
export class ArchiveComponent implements OnInit {
  notes$ = this.store
    .select('archivedNotes')
    .pipe(map((state) => state.archivedNotes));

  showEditMode = false;
  noteForEdit$: Observable<Note>;
  noteForEdit: Note;
  noteForEditIndex!: number;

  readonly isArchive = true;

  constructor(
    private editNoteService: EditNoteService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {}

  startEditNote(noteIndex: number) {
    this.noteForEdit$ = this.store.select('archivedNotes').pipe(
      map((state) => {
        this.noteForEdit = state.archivedNotes[noteIndex];
        return this.noteForEdit;
      })
    );
    this.noteForEditIndex = noteIndex;
    this.showEditMode = true;
  }

  updateNote(newNote: Note) {
    this.store.dispatch(
      new archivedNotesActions.UpdateNote({
        index: this.noteForEditIndex,
        newNote,
      })
    );
    this.store.dispatch(new archivedNotesActions.StoreNotes());

    this.showEditMode = false;
  }

  setNoteColor(color: NoteColor, noteIndex: number) {
    this.store.dispatch(
      new archivedNotesActions.UpdateNoteColor({ noteIndex, color })
    );

    this.store.dispatch(new archivedNotesActions.StoreNotes());
  }

  addLabel(label: string, noteIndex: number) {
    this.store.dispatch(
      new archivedNotesActions.AddLabelToNote({ noteIndex, label })
    );
    this.store.dispatch(new archivedNotesActions.StoreNotes());
  }

  deleteLabel(label: string, noteIndex: number) {
    this.store.dispatch(
      new archivedNotesActions.DeleteLabelFromNote({ noteIndex, label })
    );
    this.store.dispatch(new archivedNotesActions.StoreNotes());
  }

  deleteNoteFromEditMode(noteIndex: number) {
    this.editNoteService.closeEditMode.next();
    this.deleteNote(this.noteForEdit, noteIndex);
  }

  deleteNote(note: Note, noteIndex: number) {
    this.store.dispatch(new deletedNotesActions.AddNote(note));
    this.store.dispatch(new archivedNotesActions.DeleteNote(noteIndex));

    this.store.dispatch(new deletedNotesActions.StoreNotes());
    this.store.dispatch(new archivedNotesActions.StoreNotes());
  }

  unacrchiveFromEditMode(note: Note, noteIndex: number) {
    this.editNoteService.closeEditMode.next();
    this.unarchive(note, noteIndex);
  }

  unarchive(note: Note, noteIndex: number) {
    this.store.dispatch(new notesActions.AddNote(note));
    this.store.dispatch(new archivedNotesActions.DeleteNote(noteIndex));

    this.store.dispatch(new archivedNotesActions.StoreNotes());
    this.store.dispatch(new notesActions.StoreNotes());
  }
}
