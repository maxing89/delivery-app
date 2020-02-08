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

import * as rootReducer from '../../store/root.reducer';

import * as deliveryActions from './delivery.actions';
import * as homeActions from '../home/home.actions';

// import services
import { DeliveriesService } from '../../services/deliveries.service';

@Injectable()
export class DeliveryEffects {

  /* Get Delivery */
  @Effect()
  public getDelivery$: Observable<Action> = this.actions
    .ofType(deliveryActions.GET_DELIVERY)
    .debounceTime(2000)
    .withLatestFrom(this.store$.select(rootReducer.getDeliveryState))
    .switchMap(([action, store]) => {
      return this.deliveriesService.getDelivery(action.payload.deliveryID)
        .map(delivery => new deliveryActions.GetDeliverySuccess(delivery, action.payload.deliveries))
        .catch(error => Observable.of(new deliveryActions.GetDeliveryError(error.message)));
    });

  /* Create Delivery */
  @Effect()
  public createDelivery$: Observable<Action> = this.actions
    .ofType(deliveryActions.CREATE_DELIVERY)
    .map(toPayload)
    .debounceTime(2000)
    .switchMap(payload => this.deliveriesService.createDelivery(payload.delivery)
      .mergeMap(delivery => [
        new homeActions.SaveNewDelivery(payload.delivery),
        new deliveryActions.CreateDeliverySuccess(),
      ])
      .catch(error => Observable.of(new deliveryActions.CreateDeliveryError(error.message))));

  /* Create Delivery success */
  @Effect()
  public createDeliverySuccess$: Observable<Action> = this.actions
    .ofType(deliveryActions.CREATE_DELIVERY_SUCCESS)
    .map(payload => go(['/home']));

  /* Edit Delivery */
  @Effect()
  public editDelivery$: Observable<Action> = this.actions
    .ofType(deliveryActions.EDIT_DELIVERY)
    .map(toPayload)
    .debounceTime(2000)
    .switchMap(payload => this.deliveriesService.editDelivery(payload.delivery, payload.deliveryID)
      .mergeMap(delivery => [
        new homeActions.SaveEditedDelivery(payload.delivery, payload.deliveryID),
        new deliveryActions.EditDeliverySuccess(),
      ])
      .catch(error => Observable.of(new deliveryActions.CreateDeliveryError(error.message))));

  /* Edit Delivery success */
  @Effect()
  public editDeliverySuccess$: Observable<Action> = this.actions
    .ofType(deliveryActions.EDIT_DELIVERY_SUCCESS)
    .map(payload => go(['/home']));

  constructor(
    private actions: Actions,
    private store$: Store<rootReducer.State>,
    private deliveriesService: DeliveriesService
  ) {}
}
