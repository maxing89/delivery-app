import * as loginActions from './login.actions';
import { User } from '../../../models/user';

export interface State {
  authenticated: boolean;
  authorizationToken: string;
  loading: boolean;
  user?: User;
  error?: string;
}

const initialState: State = {
  authorizationToken: undefined,
  authenticated: false,
  loading: false,
};

export function reducer(state: any = initialState, action): State {

  switch (action.type) {
    case loginActions.CLEAR_AUTH_ERROR:
      return {
        ...state,
        error: null
      };
    case loginActions.AUTHENTICATION:
      return {
        ...state,
        loading: true,
        authorizationToken: '{"userName": "' + action.payload.userName + '", "password": "' + action.payload.password + '" }'
      };
    case loginActions.AUTHENTICATION_SUCCESS:
      const user: User = action.payload.user;
      if (user === null) {
        return state;
      }
      return {
        ...state,
        authenticated: true,
        loading: false,
        error: undefined,
        user: user,
      };
    case loginActions.AUTHENTICATION_ERROR:
      return {
        ...state,
        authenticated: false,
        error: action.payload.error,
        loading: false
      };
    case loginActions.UPDATE_AUTHORIZATION_TOKEN:
      const authorizationToken: string = action.payload.authorizationToken;
      return {
        ...state,
        authorizationToken: authorizationToken,
      };
    case loginActions.SIGN_OUT:
      return {
        ...state
      };
    case loginActions.SIGN_OUT_ERROR:
      return {
        ...state,
        authenticated: true,
        loading: false,
        error: action.payload.error.message,
      };
    case loginActions.SIGN_OUT_SUCCESS:
    case loginActions.UNAUTHORIZED_REDIRECT:
      return {
        ...state,
        authenticated: false,
        authorizationToken: null,
        loading: false,
        error: null,
        user: null
      };
    default:
      return state;
  }
}

export const isAuthenticated = (state: State) => state.authenticated;
export const getAuthenticatedUser = (state: State) => state.user;
export const getAuthenticationError = (state: State) => state.error;
export const isLoading = (state: State) => state.loading;
export const getAuthorizationToken = (state: State) => state.authorizationToken;
