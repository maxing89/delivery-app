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

import * as homeActions from './home.actions';

// import services
import { DeliveriesService } from '../../services/deliveries.service';

@Injectable()
export class HomeEffects {

  /* Get Deliveries */
  @Effect()
  public getDeliveries$: Observable<Action> = this.actions
    .ofType(homeActions.GET_DELIVERIES)
    .debounceTime(2000)
    .withLatestFrom(this.store$.select(rootReducer.getHomeState))
    .switchMap(([action, store]) => {
      return this.deliveriesService.getDeliveries()
        .map(deliveries => new homeActions.GetDeliveriesSuccess(
          deliveries, action.payload.pageSize, action.payload.currentPage,
          action.payload.currentSortColumn, action.payload.isDesc
        ))
        .catch(error => Observable.of(new homeActions.GetDeliveriesError(error.message)));
    });

  /* Get Deliveries */
  @Effect()
  public paginateDeliveries$: Observable<Action> = this.actions
    .ofType(homeActions.PAGINATE_DELIVERIES)
    .debounceTime(2000)
    .withLatestFrom(this.store$.select(rootReducer.getHomeState))
    .switchMap(([action, store]) => {
      return this.deliveriesService.getDeliveries()
        .map(payload => new homeActions.PaginateDeliveriesSuccess(
          action.payload.pageSize, action.payload.currentPage,
          action.payload.currentSortColumn, action.payload.isDesc
        ))
        .catch(error => Observable.of(new homeActions.GetDeliveriesError(error.message)));
    });

  /* Get Deliveries */
  @Effect()
  public deleteDelivery$: Observable<Action> = this.actions
    .ofType(homeActions.DELETE_DELIVERY)
    .debounceTime(2000)
    .withLatestFrom(this.store$.select(rootReducer.getHomeState))
    .switchMap(([action, store]) => {
      return this.deliveriesService.deleteDelivery(action.payload.deliveryID, action.payload.allDeliveries)
        .map(deliveries => new homeActions.DeleteDeliverySuccess(
          deliveries, action.payload.pageSize, action.payload.currentPage,
          action.payload.currentSortColumn, action.payload.isDesc
        ))
        .catch(error => Observable.of(new homeActions.GetDeliveriesError(error.message)));
    });

  constructor(
    private actions: Actions,
    private store$: Store<rootReducer.State>,
    private deliveriesService: DeliveriesService
  ) {}
}
