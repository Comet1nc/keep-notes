import { Action } from '@ngrx/store';
import { NoteColor } from 'src/app/models/note-colors.model';
import { Note } from 'src/app/models/note.model';

export const SET_NOTES = '[NOTES] SET_NOTES';
export const FETCH_NOTES = '[NOTES] FETCH_NOTES';
export const ADD_NOTE = '[NOTES] ADD_NOTE';
export const UPDATE_NOTE = '[NOTES] UPDATE_NOTE';
export const DELETE_NOTE = '[NOTES] DELETE_NOTE';
export const STORE_NOTES = '[NOTES] STORE_NOTES';
export const TOGGLE_PIN_NOTE = '[NOTES] TOGGLE_PIN_NOTE';
export const ADD_LABEL_TO_NOTE = '[NOTES] ADD_LABEL_TO_NOTE';
export const DELETE_LABEL_FROM_NOTE = '[NOTES] DELETE_LABEL_FROM_NOTE';
export const UPDATE_NOTE_COLOR = '[NOTES] UPDATE_NOTE_COLOR';

export class SetNotes implements Action {
  readonly type = SET_NOTES;

  constructor(public payload: Note[]) {}
}

export class FetchNotes implements Action {
  readonly type = FETCH_NOTES;
}

export class AddNote implements Action {
  readonly type = ADD_NOTE;

  constructor(public payload: Note) {}
}

export class UpdateNote implements Action {
  readonly type = UPDATE_NOTE;

  constructor(public payload: { id: string; newNote: Note }) {}
}

export class DeleteNote implements Action {
  readonly type = DELETE_NOTE;

  constructor(public payload: string) {}
}

export class StoreNotes implements Action {
  readonly type = STORE_NOTES;
}

export class TogglePinNote implements Action {
  readonly type = TOGGLE_PIN_NOTE;

  constructor(public payload: string) {}
}

export class AddLabelToNote implements Action {
  readonly type = ADD_LABEL_TO_NOTE;

  constructor(public payload: { noteId: string; label: string }) {}
}

export class DeleteLabelFromNote implements Action {
  readonly type = DELETE_LABEL_FROM_NOTE;

  constructor(public payload: { noteId: string; label: string }) {}
}

export class UpdateNoteColor implements Action {
  readonly type = UPDATE_NOTE_COLOR;

  constructor(public payload: { noteId: string; color: NoteColor }) {}
}

export type NotesActions =
  | SetNotes
  | FetchNotes
  | AddNote
  | UpdateNote
  | DeleteNote
  | StoreNotes
  | TogglePinNote
  | AddLabelToNote
  | DeleteLabelFromNote
  | UpdateNoteColor;
