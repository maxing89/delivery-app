import { Action } from '@ngrx/store';

export const START_LOADING = 'START_LOADING';
export const START_SAVING = 'START_SAVING';
export const STOP_SPINNING = 'STOP_SPINNING';

export class StartLoading implements Action {
  readonly type = START_LOADING;
  constructor() { }
}
export class StartSaving implements Action {
  readonly type = START_SAVING;
  constructor() { }
}
export class StopSpinning implements Action {
  readonly type = STOP_SPINNING;
  constructor() { }
}

export type ACTIONS =
  StartLoading |
  StartSaving |
  StopSpinning;
