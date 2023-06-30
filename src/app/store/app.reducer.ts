import * as fromNotes from './notes-store/notes.reducer';
import * as fromLabels from './labels-store/labels.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  notes: fromNotes.State;
  labels: fromLabels.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  notes: fromNotes.notesReducer,
  labels: fromLabels.labelsReducer,
};
