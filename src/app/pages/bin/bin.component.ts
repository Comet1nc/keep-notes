import { Component } from '@angular/core';
import { Note } from 'src/app/models/note.model';
import { EditNoteService } from 'src/app/shared-components/edit-note/edit-note.service';
import * as deletedNotesActions from '../../store/bin-store/bin.actions';
import * as notesActions from '../../store/notes-store/notes.actions';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-bin',
  templateUrl: './bin.component.html',
  styleUrls: ['./bin.component.scss'],
})
export class BinComponent {
  notes$ = this.store
    .select('deletedNotes')
    .pipe(map((notesState) => notesState.deletedNotes));

  showEditMode = false;
  noteForEdit$: Observable<Note>;
  noteForEdit: Note;
  noteForEditIndex!: number;

  readonly canEditNote = false;

  constructor(
    private editNoteService: EditNoteService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {}

  startEditNote(noteIndex: number) {
    this.noteForEdit$ = this.store.select('deletedNotes').pipe(
      map((state) => {
        this.noteForEdit = state.deletedNotes[noteIndex];
        return this.noteForEdit;
      })
    );
    this.noteForEditIndex = noteIndex;
    this.showEditMode = true;
  }

  updateNote() {
    this.showEditMode = false;
  }

  deleteLabel(label: string, noteIndex: number) {
    this.store.dispatch(
      new deletedNotesActions.DeleteLabelFromNote({ noteIndex, label })
    );
  }

  clearBin() {
    this.store.dispatch(new deletedNotesActions.DeleteAllNotes());
    this.store.dispatch(new deletedNotesActions.StoreNotes());
  }

  deleteForeverFromEditMode(noteIndex: number) {
    this.editNoteService.closeEditMode.next();
    this.deleteForever(noteIndex);
  }

  deleteForever(noteIndex: number) {
    this.store.dispatch(new deletedNotesActions.DeleteNote(noteIndex));
    this.store.dispatch(new deletedNotesActions.StoreNotes());
  }

  restoreFromBinEditMode(note: Note, noteIndex: number) {
    this.editNoteService.closeEditMode.next();
    this.restoreFromBin(note, noteIndex);
  }

  restoreFromBin(note: Note, noteIndex: number) {
    this.store.dispatch(new notesActions.AddNote(note));
    this.store.dispatch(new deletedNotesActions.DeleteNote(noteIndex));

    this.store.dispatch(new notesActions.StoreNotes());
    this.store.dispatch(new deletedNotesActions.StoreNotes());
  }
}
