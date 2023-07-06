import { Component } from '@angular/core';
import { Note } from 'src/app/models/note.model';
import { EditNoteService } from 'src/app/shared-components/edit-note/edit-note.service';
import * as deletedNotesActions from '../../store/bin-store/bin.actions';
import * as notesActions from '../../store/notes-store/notes.actions';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';

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
  editModeNote!: Note;

  readonly canEditNote = false;

  constructor(
    private editNoteService: EditNoteService,
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

  deleteForever(noteIndex: number) {
    this.store.dispatch(new deletedNotesActions.DeleteNote(noteIndex));
    this.store.dispatch(new deletedNotesActions.StoreNotes());
  }

  restoreFromBin(note: Note, noteIndex: number) {
    this.store.dispatch(new notesActions.AddNote(note));
    this.store.dispatch(new deletedNotesActions.DeleteNote(noteIndex));

    this.store.dispatch(new notesActions.StoreNotes());
    this.store.dispatch(new deletedNotesActions.StoreNotes());
  }
}
