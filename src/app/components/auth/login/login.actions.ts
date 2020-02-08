import { Action } from '@ngrx/store';
import { User } from '../../../models/user';

export const CLEAR_AUTH_ERROR = 'CLEAR_AUTH_ERROR';
export const AUTHENTICATION = 'AUTHENTICATION';
export const AUTHENTICATION_SUCCESS = 'AUTHENTICATION_SUCCESS';
export const AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR';
export const UPDATE_AUTHORIZATION_TOKEN = 'UPDATE_AUTHORIZATION_TOKEN';
export const UNAUTHORIZED_REDIRECT = 'UNAUTHORIZED_REDIRECT';
export const SIGN_OUT = 'SIGN_OUT';
export const SIGN_OUT_SUCCESS = 'SIGN_OUT_SUCCESS';
export const SIGN_OUT_ERROR = 'SIGN_OUT_ERROR';

export const START_LOADING_ACTIONS = [
  AUTHENTICATION,
  SIGN_OUT,
];

export const STOP_SPINNING_ACTIONS = [
  AUTHENTICATION_SUCCESS,
  AUTHENTICATION_ERROR,
  SIGN_OUT_SUCCESS,
  SIGN_OUT_ERROR,
];

export class ClearAuthError implements Action {
  readonly type = CLEAR_AUTH_ERROR;
  readonly payload: object;
  constructor() {}
}

export class Authentication implements Action {
  readonly type = AUTHENTICATION;
  readonly payload: object;
  constructor(userName: string, password: string) {
    this.payload = {
      userName: userName,
      password: password
    };
  }
}

export class AuthenticationSuccess implements Action {
  readonly type = AUTHENTICATION_SUCCESS;
  readonly payload: object;
  constructor(user: User) {
    this.payload = {
      user: user
    };
  }
}

export class AuthenticationError implements Action {
  readonly type = AUTHENTICATION_ERROR;
  readonly payload: object;
  constructor(error) {
    this.payload = {
      error: error
    };
  }
}

export class UpdateAuthorizationToken implements Action {
  readonly type = UPDATE_AUTHORIZATION_TOKEN;
  readonly payload: object;
  constructor(authorizationToken) {
    this.payload = {
      authorizationToken: authorizationToken
    };
  }
}

export class UnauthorizedRedirect implements Action {
  readonly type = UNAUTHORIZED_REDIRECT;
  readonly payload: object;
  constructor() {}
}

export class SignOut implements Action {
  readonly type = SIGN_OUT;
  readonly payload: object;
  constructor() {}
}

export class SignOutSuccess implements Action {
  readonly type = SIGN_OUT_SUCCESS;
  readonly payload: object;
  constructor() {}
}

export class SignOutError implements Action {
  readonly type = SIGN_OUT_ERROR;
  readonly payload: object;
  constructor(error) {
    this.payload = {
      error: error
    };
  }
}

export type Actions
  = Authentication
  | AuthenticationSuccess
  | AuthenticationError
  | UpdateAuthorizationToken
  | UnauthorizedRedirect
  | SignOut
  | SignOutSuccess
  | SignOutError;
