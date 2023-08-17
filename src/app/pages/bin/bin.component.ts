import { ChangeDetectionStrategy, Component } from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BinComponent {
  notes$ = this.store
    .select('deletedNotes')
    .pipe(map((notesState) => notesState.deletedNotes));

  showEditMode = false;
  noteForEdit$: Observable<Note>;
  noteForEdit: Note;

  readonly canEditNote = false;

  constructor(
    private editNoteService: EditNoteService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {}

  startEditNote(noteId: string) {
    this.noteForEdit$ = this.store.select('deletedNotes').pipe(
      map((state) => {
        this.noteForEdit = state.deletedNotes.find(
          (note) => note.id === noteId
        );
        return this.noteForEdit;
      })
    );
    this.showEditMode = true;
  }

  updateNote(newNote: Note) {
    this.showEditMode = false;
  }

  deleteLabel(label: string, noteId: string) {
    this.store.dispatch(
      new deletedNotesActions.DeleteLabelFromNote({ noteId, label })
    );
  }

  clearBin() {
    this.store.dispatch(new deletedNotesActions.DeleteAllNotes());
    this.store.dispatch(new deletedNotesActions.StoreNotes());
  }

  deleteForeverFromEditMode(noteId: string) {
    this.editNoteService.closeEditMode.next();
    this.deleteForever(noteId);
  }

  deleteForever(noteId: string) {
    this.store.dispatch(new deletedNotesActions.DeleteNote(noteId));
    this.store.dispatch(new deletedNotesActions.StoreNotes());
  }

  restoreFromBinEditMode(note: Note, noteId: string) {
    this.editNoteService.closeEditMode.next();
    this.restoreFromBin(note, noteId);
  }

  restoreFromBin(note: Note, noteId: string) {
    this.store.dispatch(new notesActions.AddNote(note));
    this.store.dispatch(new deletedNotesActions.DeleteNote(noteId));

    this.store.dispatch(new notesActions.StoreNotes());
    this.store.dispatch(new deletedNotesActions.StoreNotes());
  }

  identify(index: number, item: Note) {
    return item.id;
  }
}
