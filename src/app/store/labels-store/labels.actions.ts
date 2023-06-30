import { Action } from '@ngrx/store';

export const FETCH_LABELS = '[LABELS] FETCH_LABELS';
export const SET_LABELS = '[LABELS] SET_LABELS';
export const STORE_LABELS = '[LABELS] STORE_LABELS';

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

export type LabelsActions = FetchLabels | SetLabels | StoreLabels;
