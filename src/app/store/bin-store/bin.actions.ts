import { Action } from '@ngrx/store';
import { Note } from 'src/app/models/note.model';

export const SET_NOTES = '[DELETED_NOTES] SET_NOTES';
export const FETCH_NOTES = '[DELETED_NOTES] FETCH_NOTES';
export const ADD_NOTE = '[DELETED_NOTES] ADD_NOTE';
export const DELETE_NOTE = '[DELETED_NOTES] DELETE_NOTE';
export const STORE_NOTES = '[DELETED_NOTES] STORE_NOTES';
export const DELETE_LABEL_FROM_NOTE = '[DELETED_NOTES] DELETE_LABEL_FROM_NOTE';
export const DELETE_ALL_NOTES = '[DELETED_NOTES] DELETE_ALL_NOTES';

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

export class DeleteNote implements Action {
  readonly type = DELETE_NOTE;

  constructor(public payload: string) {}
}

export class StoreNotes implements Action {
  readonly type = STORE_NOTES;
}

export class DeleteLabelFromNote implements Action {
  readonly type = DELETE_LABEL_FROM_NOTE;

  constructor(public payload: { noteId: string; label: string }) {}
}

export class DeleteAllNotes implements Action {
  readonly type = DELETE_ALL_NOTES;
}

export type DeletedNotesActions =
  | SetNotes
  | FetchNotes
  | AddNote
  | DeleteNote
  | StoreNotes
  | DeleteLabelFromNote
  | DeleteAllNotes;
