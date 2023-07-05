import { Note } from 'src/app/models/note.model';
import * as DeletedNotesActions from './bin.actions';

export interface State {
  deletedNotes: Note[];
}

const initialState: State = {
  deletedNotes: [],
};

export function deletedNotesReducer(
  state = initialState,
  action: DeletedNotesActions.DeletedNotesActions
): State {
  switch (action.type) {
    case DeletedNotesActions.SET_NOTES:
      return {
        ...state,
        deletedNotes: [...action.payload],
      };
    case DeletedNotesActions.ADD_NOTE:
      return {
        ...state,
        deletedNotes: [...state.deletedNotes, action.payload],
      };
    case DeletedNotesActions.DELETE_NOTE:
      return {
        ...state,
        deletedNotes: state.deletedNotes.filter((note: Note, index: number) => {
          return index != action.payload;
        }), // filter return the new list so we dont need to mutate
      };
    case DeletedNotesActions.DELETE_LABEL_FROM_NOTE:
      const labels = state.deletedNotes[action.payload.noteIndex].labels.filter(
        (label) => label !== action.payload.label
      );

      const _note = {
        ...state.deletedNotes[action.payload.noteIndex],
        labels: labels,
      };

      const _resultNotes = [...state.deletedNotes];
      _resultNotes[action.payload.noteIndex] = _note;

      return {
        ...state,
        deletedNotes: _resultNotes,
      };
    case DeletedNotesActions.DELETE_ALL_NOTES:
      return {
        ...state,
        deletedNotes: [],
      };
    default:
      return state;
  }
}
