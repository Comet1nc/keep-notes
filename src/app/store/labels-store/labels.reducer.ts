import * as LabelsActions from './labels.actions';

export interface State {
  labels: string[];
}

const initialState: State = {
  labels: [],
};

export function labelsReducer(
  state = initialState,
  action: LabelsActions.LabelsActions
): State {
  switch (action.type) {
    case LabelsActions.SET_LABELS:
      return {
        ...state,
        labels: [...action.payload],
      };
    default:
      return state;
  }
}
