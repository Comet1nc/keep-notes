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
        deletedNotes: state.deletedNotes.filter((note: Note, i: number) => {
          return note.id != action.payload;
        }),
      };
    case DeletedNotesActions.DELETE_LABEL_FROM_NOTE:
      const _resultNotes = state.deletedNotes.map((note) =>
        note.id === action.payload.noteId
          ? {
              ...note,
              labels: note.labels.filter(
                (label, i) => label !== action.payload.label
              ),
            }
          : note
      );
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
