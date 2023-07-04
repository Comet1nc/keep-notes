import { Action } from '@ngrx/store';
import { Note } from 'src/app/models/note.model';

export const SET_NOTES = '[ARCHIVED_NOTES] SET_NOTES';
export const FETCH_NOTES = '[ARCHIVED_NOTES] FETCH_NOTES';
export const ADD_NOTE = '[ARCHIVED_NOTES] ADD_NOTE';
export const DELETE_NOTE = '[ARCHIVED_NOTES] DELETE_NOTE';
export const STORE_NOTES = '[ARCHIVED_NOTES] STORE_NOTES';

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

  constructor(public payload: number) {}
}

export class StoreNotes implements Action {
  readonly type = STORE_NOTES;
}

export type DeletedNotesActions =
  | SetNotes
  | FetchNotes
  | AddNote
  | DeleteNote
  | StoreNotes;
