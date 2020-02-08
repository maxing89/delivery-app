import * as actions from './spinner.actions';

export enum spin_state {
  NONE,
  LOADING,
  SAVING
}

export interface State {
  spin: spin_state;
}

export const initialState: State = {
  spin: spin_state.NONE
};

export function reducer(state: State = initialState, action: actions.ACTIONS): State {
  switch (action.type) {
    case actions.START_LOADING:
      return {
        spin: spin_state.LOADING
      };
    case actions.START_SAVING:
      return {
        spin: spin_state.SAVING
      };
    case actions.STOP_SPINNING:
      return {
        spin: spin_state.NONE
    };
    default:
      return state;
  }
}

export const getSpin = (state: State) => state.spin;
