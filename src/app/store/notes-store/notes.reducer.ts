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
    case NotesActions.TOGGLE_PIN_NOTE:
      const updatedPinNote: Note = {
        ...state.notes[action.payload],
        isPinned: !state.notes[action.payload].isPinned,
      };

      const notes = [...state.notes];
      notes[action.payload] = updatedPinNote;

      return {
        ...state,
        notes: notes,
      };
    case NotesActions.ADD_LABEL_TO_NOTE:
      let updatedLabels;

      if (state.notes[action.payload.noteIndex].labels) {
        updatedLabels = [
          ...state.notes[action.payload.noteIndex].labels,
          action.payload.label,
        ];
      } else {
        updatedLabels = [action.payload.label];
      }

      const noteWithNewLabel: Note = {
        ...state.notes[action.payload.noteIndex],
        labels: updatedLabels,
      };

      const resultNotes = [...state.notes];
      resultNotes[action.payload.noteIndex] = noteWithNewLabel;

      return {
        ...state,
        notes: resultNotes,
      };
    case NotesActions.DELETE_LABEL_FROM_NOTE:
      const labels = state.notes[action.payload.noteIndex].labels.filter(
        (label) => label !== action.payload.label
      );

      const _note = {
        ...state.notes[action.payload.noteIndex],
        labels: labels,
      };

      const _resultNotes = [...state.notes];
      _resultNotes[action.payload.noteIndex] = _note;

      return {
        ...state,
        notes: _resultNotes,
      };
    default:
      return state;
  }
}
