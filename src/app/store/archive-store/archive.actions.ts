import { Action } from '@ngrx/store';
import { NoteColor } from 'src/app/models/note-colors.model';
import { Note } from 'src/app/models/note.model';

export const SET_NOTES = '[ARCHIVED_NOTES] SET_NOTES';
export const FETCH_NOTES = '[ARCHIVED_NOTES] FETCH_NOTES';
export const ADD_NOTE = '[ARCHIVED_NOTES] ADD_NOTE';
export const UPDATE_NOTE = '[ARCHIVED_NOTES] UPDATE_NOTE';
export const DELETE_NOTE = '[ARCHIVED_NOTES] DELETE_NOTE';
export const STORE_NOTES = '[ARCHIVED_NOTES] STORE_NOTES';
export const ADD_LABEL_TO_NOTE = '[ARCHIVED_NOTES] ADD_LABEL_TO_NOTE';
export const DELETE_LABEL_FROM_NOTE = '[ARCHIVED_NOTES] DELETE_LABEL_FROM_NOTE';
export const UPDATE_NOTE_COLOR = '[ARCHIVED_NOTES] UPDATE_NOTE_COLOR';

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

export type ArchivedNotesActions =
  | SetNotes
  | FetchNotes
  | AddNote
  | UpdateNote
  | DeleteNote
  | StoreNotes
  | AddLabelToNote
  | DeleteLabelFromNote
  | UpdateNoteColor;
