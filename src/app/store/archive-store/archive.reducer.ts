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
      const updatedNotes = state.archivedNotes.map((note) => {
        if (note.id === action.payload.id) {
          return { ...note, ...action.payload.newNote };
        } else {
          return note;
        }
      });

      return {
        ...state,
        archivedNotes: updatedNotes,
      };
    case ArchivedNotesActions.DELETE_NOTE:
      return {
        ...state,
        archivedNotes: state.archivedNotes.filter((note: Note, i: number) => {
          return note.id != action.payload;
        }),
      };
    case ArchivedNotesActions.ADD_LABEL_TO_NOTE:
      const resultNotes = state.archivedNotes.map((note) => {
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
        archivedNotes: resultNotes,
      };
    case ArchivedNotesActions.DELETE_LABEL_FROM_NOTE:
      const _resultNotes = state.archivedNotes.map((note) =>
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
        archivedNotes: _resultNotes,
      };
    case ArchivedNotesActions.UPDATE_NOTE_COLOR:
      const notes_ = state.archivedNotes.map((note) =>
        note.id === action.payload.noteId
          ? { ...note, color: action.payload.color }
          : note
      );

      return {
        ...state,
        archivedNotes: notes_,
      };
    default:
      return state;
  }
}
