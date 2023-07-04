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
    case ArchivedNotesActions.ADD_LABEL_TO_NOTE:
      let updatedLabels;

      if (state.archivedNotes[action.payload.noteIndex].labels) {
        updatedLabels = [
          ...state.archivedNotes[action.payload.noteIndex].labels,
          action.payload.label,
        ];
      } else {
        updatedLabels = [action.payload.label];
      }

      const noteWithNewLabel: Note = {
        ...state.archivedNotes[action.payload.noteIndex],
        labels: updatedLabels,
      };

      const resultNotes = [...state.archivedNotes];
      resultNotes[action.payload.noteIndex] = noteWithNewLabel;

      return {
        ...state,
        archivedNotes: resultNotes,
      };
    case ArchivedNotesActions.DELETE_LABEL_FROM_NOTE:
      const labels = state.archivedNotes[
        action.payload.noteIndex
      ].labels.filter((label) => label !== action.payload.label);

      const _note = {
        ...state.archivedNotes[action.payload.noteIndex],
        labels: labels,
      };

      const _resultNotes = [...state.archivedNotes];
      _resultNotes[action.payload.noteIndex] = _note;

      return {
        ...state,
        archivedNotes: _resultNotes,
      };
    case ArchivedNotesActions.UPDATE_NOTE_COLOR:
      const updatedNoteWithColor: Note = {
        ...state.archivedNotes[action.payload.noteIndex],
        color: action.payload.color,
      };

      const notes_ = [...state.archivedNotes];
      notes_[action.payload.noteIndex] = updatedNoteWithColor;

      return {
        ...state,
        archivedNotes: notes_,
      };
    default:
      return state;
  }
}
