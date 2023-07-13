import { Note } from 'src/app/models/note.model';
import * as NotesActions from './notes.actions';

export interface State {
  notes: Note[];
}

const initialState: State = {
  notes: [],
};

export function notesReducer(
  state = initialState,
  action: NotesActions.NotesActions
): State {
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
      const updatedNotes = state.notes.map((note) => {
        if (note.id === action.payload.id) {
          return { ...note, ...action.payload.newNote };
        } else {
          return note;
        }
      });

      return {
        ...state,
        notes: updatedNotes,
      };
    case NotesActions.DELETE_NOTE:
      return {
        ...state,
        notes: state.notes.filter((note) => note.id !== action.payload),
      };
    case NotesActions.TOGGLE_PIN_NOTE:
      const notes = state.notes.map((note) =>
        note.id === action.payload
          ? { ...note, isPinned: !note.isPinned }
          : note
      );

      return {
        ...state,
        notes: notes,
      };
    case NotesActions.ADD_LABEL_TO_NOTE:
      const resultNotes = state.notes.map((note) => {
        if (note.id === action.payload.noteId) {
          let updatedLabels: string[];
          if (note.labels) {
            updatedLabels = [...note.labels, action.payload.label];
          } else {
            updatedLabels = [action.payload.label];
          }
          return { ...note, labels: updatedLabels };
        } else {
          return note;
        }
      });
      return {
        ...state,
        notes: resultNotes,
      };
    case NotesActions.DELETE_LABEL_FROM_NOTE:
      const _resultNotes = state.notes.map((note) =>
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
        notes: _resultNotes,
      };
    case NotesActions.UPDATE_NOTE_COLOR:
      const notes_ = state.notes.map((note) =>
        note.id === action.payload.noteId
          ? { ...note, color: action.payload.color }
          : note
      );

      return {
        ...state,
        notes: notes_,
      };
    default:
      return state;
  }
}
