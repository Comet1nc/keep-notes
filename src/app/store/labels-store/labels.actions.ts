import { Action } from '@ngrx/store';

export const FETCH_LABELS = '[LABELS] FETCH_LABELS';
export const SET_LABELS = '[LABELS] SET_LABELS';
export const STORE_LABELS = '[LABELS] STORE_LABELS';
export const ADD_LABEL = '[LABELS] ADD_NOTE';
export const UPDATE_LABEL = '[LABELS] UPDATE_NOTE';
export const DELETE_LABEL = '[LABELS] DELETE_NOTE';
export const TOGGLE_EDIT_LABEL_MENU = '[LABELS] TOGGLE_EDIT_LABEL_MENU';

export class FetchLabels implements Action {
  readonly type = FETCH_LABELS;
}

export class SetLabels implements Action {
  readonly type = SET_LABELS;

  constructor(public payload: string[]) {}
}

export class StoreLabels implements Action {
  readonly type = STORE_LABELS;
}

export class AddLabel implements Action {
  readonly type = ADD_LABEL;

  constructor(public payload: string) {}
}

export class UpdateLabel implements Action {
  readonly type = UPDATE_LABEL;

  constructor(public payload: { index: number; updatedLabel: string }) {}
}

export class DeleteLabel implements Action {
  readonly type = DELETE_LABEL;

  constructor(public payload: number) {}
}

export class ToggleEditLabelMenu implements Action {
  readonly type = TOGGLE_EDIT_LABEL_MENU;
}

export type LabelsActions =
  | FetchLabels
  | SetLabels
  | StoreLabels
  | AddLabel
  | UpdateLabel
  | DeleteLabel
  | ToggleEditLabelMenu;
