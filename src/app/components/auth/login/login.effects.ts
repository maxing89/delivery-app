import { Injectable } from '@angular/core';

// import @ngrx
import { Store } from '@ngrx/store';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { go } from '@ngrx/router-store';

// import rxjs
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';

import * as rootReducer from '../../../store/root.reducer';

import * as loginActions from './login.actions';

// import services
import { AuthService } from '../../../services/auth.service';

@Injectable()
export class LoginEffects {

  /* Login user */
  @Effect()
  public authentication$: Observable<Action> = this.actions
    .ofType(loginActions.AUTHENTICATION)
    .debounceTime(500) // Eliminar esta línea después de crear la API
    .withLatestFrom(this.store$.select(rootReducer.getUsersState))
    .switchMap(([action, store]) => {
      return this.authService.authenticate(action.payload.userName, action.payload.password)
        .map(user => new loginActions.AuthenticationSuccess(user))
        .catch(error => Observable.of(new loginActions.AuthenticationError(error.message)));
    });

  /* Login user success */
  @Effect()
  public authenticationSuccess: Observable<Action> = this.actions
    .ofType(loginActions.AUTHENTICATION_SUCCESS)
    .map(payload => go(['/home']));

    /* Logout user */
  @Effect()
  public signOut: Observable<Action> = this.actions
    .ofType(loginActions.SIGN_OUT)
    .debounceTime(1000)
    .map(toPayload)
    .switchMap(payload => {
      return this.authService.signout()
        .map(value => new loginActions.SignOutSuccess())
        .catch(error => Observable.of(new loginActions.SignOutError(error.message)));
    });

  /* Login user success */
  @Effect()
  public signOutSuccess: Observable<Action> = this.actions
    .ofType(loginActions.SIGN_OUT_SUCCESS)
    .map(payload => go(['/login']));

  constructor(
    private actions: Actions,
    private store$: Store<rootReducer.State>,
    private authService: AuthService
  ) {}
}
