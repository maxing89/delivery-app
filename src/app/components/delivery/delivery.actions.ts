import { Action } from '@ngrx/store';

import { Delivery } from './delivery.models';

export const GET_DELIVERY = 'GET_DELIVERY';
export const GET_DELIVERY_SUCCESS = 'GET_DELIVERY_SUCCESS';
export const GET_DELIVERY_ERROR = 'GET_DELIVERY_ERROR';
export const CREATE_DELIVERY = 'CREATE_DELIVERY';
export const CREATE_DELIVERY_SUCCESS = 'CREATE_DELIVERY_SUCCESS';
export const CREATE_DELIVERY_ERROR = 'CREATE_DELIVERY_ERROR';
export const EDIT_DELIVERY = 'EDIT_DELIVERY';
export const EDIT_DELIVERY_SUCCESS = 'EDIT_DELIVERY_SUCCESS';
export const EDIT_DELIVERY_ERROR = 'EDIT_DELIVERY_ERROR';
export const RESET_DELIVERY = 'RESET_DELIVERY';

export const START_LOADING_ACTIONS = [
  GET_DELIVERY,
  CREATE_DELIVERY,
  EDIT_DELIVERY
];

export const STOP_SPINNING_ACTIONS = [
  GET_DELIVERY_SUCCESS,
  GET_DELIVERY_ERROR,
  CREATE_DELIVERY_SUCCESS,
  CREATE_DELIVERY_ERROR,
  EDIT_DELIVERY_SUCCESS,
  EDIT_DELIVERY_ERROR
];

export class GetDelivery implements Action {
  readonly type = GET_DELIVERY;
  readonly payload: object;
  constructor(deliveryID: number, deliveries: Array<any>) {
    this.payload = {
      deliveryID: deliveryID,
      deliveries: deliveries
    };
  }
}

export class GetDeliverySuccess implements Action {
  readonly type = GET_DELIVERY_SUCCESS;
  readonly payload: object;
  constructor(delivery, deliveries: Array<any>) {
    this.payload = {
      delivery: delivery,
      deliveries: deliveries
    };
  }
}

export class GetDeliveryError implements Action {
  readonly type = GET_DELIVERY_ERROR;
  readonly payload: object;
  constructor(error) {
    this.payload = {
      error: error
    };
  }
}

export class CreateDelivery implements Action {
  readonly type = CREATE_DELIVERY;
  readonly payload: object;
  constructor(delivery) {
    this.payload = {
      delivery: delivery
    };
  }
}

export class CreateDeliverySuccess implements Action {
  readonly type = CREATE_DELIVERY_SUCCESS;
  readonly payload: object;
  constructor() {}
}

export class CreateDeliveryError implements Action {
  readonly type = CREATE_DELIVERY_ERROR;
  readonly payload: object;
  constructor(error) {
    this.payload = {
      error: error
    };
  }
}

export class EditDelivery implements Action {
  readonly type = EDIT_DELIVERY;
  readonly payload: object;
  constructor(delivery, deliveryID) {
    this.payload = {
      delivery: delivery,
      deliveryID: deliveryID
    };
  }
}

export class EditDeliverySuccess implements Action {
  readonly type = EDIT_DELIVERY_SUCCESS;
  readonly payload: object;
  constructor() {}
}

export class EditDeliveryError implements Action {
  readonly type = EDIT_DELIVERY_ERROR;
  readonly payload: object;
  constructor(error) {
    this.payload = {
      error: error
    };
  }
}

export class ResetDelivery implements Action {
  readonly type = RESET_DELIVERY;
  readonly payload: object;
  constructor() {}
}

export type Actions
  = GetDelivery
  | GetDeliverySuccess
  | GetDeliveryError
  | CreateDelivery
  | CreateDeliverySuccess
  | CreateDeliveryError
  | EditDelivery
  | EditDeliverySuccess
  | EditDeliveryError;
