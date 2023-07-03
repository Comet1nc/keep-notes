import { Note } from 'src/app/models/note.model';
import * as ArchivedNotesActions from './archive.actions';

export interface State {
  archivedNotes: Note[];
}

const initialState: State = {
  archivedNotes: [],
};

export function archivedNotesReducer(
  state = initialState,
  action: ArchivedNotesActions.ArchivedNotesActions
): State {
  switch (action.type) {
    case ArchivedNotesActions.SET_NOTES:
      return {
        ...state,
        archivedNotes: [...action.payload],
      };
    case ArchivedNotesActions.ADD_NOTE:
      return {
        ...state,
        archivedNotes: [...state.archivedNotes, action.payload],
      };
    case ArchivedNotesActions.UPDATE_NOTE:
      const updatedNote = {
        ...state.archivedNotes[action.payload.index],
        ...action.payload.newNote,
      };

      const updatedNotes = [...state.archivedNotes];
      updatedNotes[action.payload.index] = updatedNote;

      return {
        ...state,
        archivedNotes: updatedNotes,
      };
    case ArchivedNotesActions.DELETE_NOTE:
      return {
        ...state,
        archivedNotes: state.archivedNotes.filter(
          (note: Note, index: number) => {
            return index != action.payload;
          }
        ), // filter return the new list so we dont need to mutate
      };
    default:
      return state;
  }
}
