import * as fromNotes from './notes-store/notes.reducer';
import * as fromLabels from './labels-store/labels.reducer';
import * as fromArchivedNotes from './archive-store/archive.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  notes: fromNotes.State;
  labels: fromLabels.State;
  archivedNotes: fromArchivedNotes.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  notes: fromNotes.notesReducer,
  labels: fromLabels.labelsReducer,
  archivedNotes: fromArchivedNotes.archivedNotesReducer,
};
