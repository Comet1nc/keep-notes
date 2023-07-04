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
    default:
      return state;
  }
}
