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

  readonly isArchive = true;

  constructor(
    private editNoteService: EditNoteService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {}

  startEditNote(noteId: string) {
    this.noteForEdit$ = this.store.select('archivedNotes').pipe(
      map((state) => {
        this.noteForEdit = state.archivedNotes.find(
          (note) => note.id === noteId
        );
        return this.noteForEdit;
      })
    );
    this.showEditMode = true;
  }

  updateNote(newNote: Note) {
    this.store.dispatch(
      new archivedNotesActions.UpdateNote({
        id: this.noteForEdit.id,
        newNote,
      })
    );
    this.store.dispatch(new archivedNotesActions.StoreNotes());

    this.showEditMode = false;
  }

  setNoteColor(color: NoteColor, noteId: string) {
    this.store.dispatch(
      new archivedNotesActions.UpdateNoteColor({ noteId, color })
    );

    this.store.dispatch(new archivedNotesActions.StoreNotes());
  }

  addLabel(label: string, noteId: string) {
    this.store.dispatch(
      new archivedNotesActions.AddLabelToNote({ noteId, label })
    );
    this.store.dispatch(new archivedNotesActions.StoreNotes());
  }

  deleteLabel(label: string, noteId: string) {
    this.store.dispatch(
      new archivedNotesActions.DeleteLabelFromNote({ noteId, label })
    );
    this.store.dispatch(new archivedNotesActions.StoreNotes());
  }

  deleteNoteFromEditMode(noteId: string) {
    this.editNoteService.closeEditMode.next();
    this.deleteNote(this.noteForEdit, noteId);
  }

  deleteNote(note: Note, noteId: string) {
    this.store.dispatch(new deletedNotesActions.AddNote(note));
    this.store.dispatch(new archivedNotesActions.DeleteNote(noteId));

    this.store.dispatch(new deletedNotesActions.StoreNotes());
    this.store.dispatch(new archivedNotesActions.StoreNotes());
  }

  unarchiveFromEditMode(note: Note, noteId: string) {
    this.editNoteService.closeEditMode.next();
    this.unarchive(note, noteId);
  }

  unarchive(note: Note, noteId: string) {
    this.store.dispatch(new notesActions.AddNote(note));
    this.store.dispatch(new archivedNotesActions.DeleteNote(noteId));

    this.store.dispatch(new archivedNotesActions.StoreNotes());
    this.store.dispatch(new notesActions.StoreNotes());
  }

  identify(index: number, item: Note) {
    return item.id;
  }
}
