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
    case LabelsActions.ADD_LABEL:
      return {
        ...state,
        labels: [...state.labels, action.payload],
      };
    case LabelsActions.UPDATE_LABEL:
      let updatedLabels = [...state.labels];
      updatedLabels[action.payload.index] = action.payload.updatedLabel;

      return {
        ...state,
        labels: updatedLabels,
      };
    case LabelsActions.DELETE_LABEL:
      return {
        ...state,
        labels: state.labels.filter(
          (label: string, index: number) => index !== action.payload
        ),
      };
    default:
      return state;
  }
}
