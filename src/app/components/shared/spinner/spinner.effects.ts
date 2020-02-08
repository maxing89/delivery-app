import { Injectable } from '@angular/core';

import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import * as rootReducer from '../../../store/root.reducer';
import * as spinnerActions from './spinner.actions';
import * as loginActions from '../../auth/login/login.actions';
import * as homeActions from '../../home/home.actions';
import * as deliveryActions from '../../delivery/delivery.actions';

@Injectable()
export class SpinnerEffects {

  @Effect()
    startLoading$: Observable<Action> = this.actions
    .ofType(
      ...loginActions.START_LOADING_ACTIONS,
      ...homeActions.START_LOADING_ACTIONS,
      ...deliveryActions.START_LOADING_ACTIONS,
    )
    .map(() => new spinnerActions.StartLoading());

  @Effect()
    stopSpinning$: Observable<Action> = this.actions
    .ofType(
      ...loginActions.STOP_SPINNING_ACTIONS,
      ...homeActions.STOP_SPINNING_ACTIONS,
      ...deliveryActions.STOP_SPINNING_ACTIONS,
    )
    .map(() => new spinnerActions.StopSpinning());

  constructor(
    private actions: Actions,
    private store: Store<rootReducer.State>
  ) {}

}
