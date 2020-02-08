import { createSelector } from 'reselect';
import { ActionReducer } from '@ngrx/store';
import { combineReducers } from '@ngrx/store';

import { compose } from '@ngrx/core/compose';
import { storeFreeze } from 'ngrx-store-freeze';
import { localStorageSync } from 'ngrx-store-localstorage';

// environment
import { environment } from '../../environments/environment';

// reducers
import * as spinner from '../components/shared/spinner/spinner.reducer';
import * as login from '../components/auth/login/login.reducer';
import * as home from '../components/home/home.reducer';
import * as delivery from '../components/delivery/delivery.reducer';

export interface State {
  spinner: spinner.State;
  login: login.State;
  home: home.State;
  delivery: delivery.State;
}

const reducers = {
  spinner: spinner.reducer,
  login: login.reducer,
  home: home.reducer,
  delivery: delivery.reducer,
};

// development reducer includes storeFreeze to prevent state from being mutated
const developmentReducer: ActionReducer<State> = compose(
storeFreeze,
localStorageSync({keys: ['login'], rehydrate: true}),
combineReducers)(reducers);


// production reducer
const productionReducer: ActionReducer<State> = compose(
localStorageSync({keys: ['login'], rehydrate: true}),
combineReducers)(reducers);

export function reducer(state: any, action: any) {
  if (environment.production) {
    return productionReducer(state, action);
  } else {
    return developmentReducer(state, action);
  }
}

// Spinner
export const getSpinnerState = (state: State) => state.spinner;
export const getSpin = createSelector(getSpinnerState, spinner.getSpin);

// Login
export const getUsersState = (state: State) => state.login;
export const isAuthenticated = createSelector(getUsersState, login.isAuthenticated);
export const getAuthorizationToken = createSelector(getUsersState, login.getAuthorizationToken);
export const getAuthenticatedUser = createSelector(getUsersState, login.getAuthenticatedUser);
export const getAuthenticationError = createSelector(getUsersState, login.getAuthenticationError);
export const isAuthenticationLoading = createSelector(getUsersState, login.isLoading);

// Home
export const getHomeState = (state: State) => state.home;
export const getDeliveries = createSelector(getHomeState, home.getDeliveries);
export const getAllDeliveries = createSelector(getHomeState, home.getAllDeliveries);
export const getDeliveriesLength = createSelector(getHomeState, home.getDeliveriesLength);
export const getLoading = createSelector(getHomeState, home.getLoading);

// Delivery
export const getDeliveryState = (state: State) => state.delivery;
export const getDelivery = createSelector(getDeliveryState, delivery.getDelivery);
export const getLoadingDelivery = createSelector(getDeliveryState, delivery.getLoadingDelivery);
