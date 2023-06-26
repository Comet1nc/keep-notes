import { Note } from 'src/app/models/note.model';
import * as NotesActions from './notes.actions';

export interface State {
  notes: Note[];
}

const initialState: State = {
  notes: [],
};

export function notesReducer(state, action: NotesActions.NotesActions) {
  switch (action.type) {
    case NotesActions.SET_NOTES:
      return {
        ...state,
        notes: [...action.payload],
      };
    case NotesActions.ADD_NOTE:
      return {
        ...state,
        notes: [...state.notes, action.payload],
      };
    case NotesActions.UPDATE_NOTE:
      const updatedNote = {
        ...state.notes[action.payload.index],
        ...action.payload.newNote,
      };

      const updatedNotes = [...state.notes];
      updatedNotes[action.payload.index] = updatedNote;

      return {
        ...state,
        notes: updatedNotes,
      };
    case NotesActions.DELETE_NOTE:
      return {
        ...state,
        notes: state.notes.filter((note: Note, index: number) => {
          return index != action.payload;
        }), // filter return the new list so we dont need to mutate
      };
    default:
      return state;
  }
}
