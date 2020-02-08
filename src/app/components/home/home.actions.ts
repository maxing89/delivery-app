import { Action } from '@ngrx/store';

export const GET_DELIVERIES = 'GET_DELIVERIES';
export const GET_DELIVERIES_SUCCESS = 'GET_DELIVERIES_SUCCESS';
export const PAGINATE_DELIVERIES = 'PAGINATE_DELIVERIES';
export const PAGINATE_DELIVERIES_SUCCESS = 'PAGINATE_DELIVERIES_SUCCESS';
export const GET_DELIVERIES_ERROR = 'GET_DELIVERIES_ERROR';
export const FILTER_DELIVERIES = 'FILTER_DELIVERIES';
export const DELETE_DELIVERY = 'DELETE_DELIVERY';
export const DELETE_DELIVERY_SUCCESS = 'DELETE_DELIVERY_SUCCESS';
export const SAVE_NEW_DELIVERY = 'SAVE_NEW_DELIVERY';
export const SAVE_EDITED_DELIVERY = 'SAVE_EDITED_DELIVERY';

export const START_LOADING_ACTIONS = [
  GET_DELIVERIES,
  PAGINATE_DELIVERIES,
  DELETE_DELIVERY,
];

export const STOP_SPINNING_ACTIONS = [
  GET_DELIVERIES_SUCCESS,
  PAGINATE_DELIVERIES_SUCCESS,
  GET_DELIVERIES_ERROR,
  DELETE_DELIVERY_SUCCESS,
];

export class GetDeliveries implements Action {
  readonly type = GET_DELIVERIES;
  readonly payload: object;
  constructor(pageSize: number, currentPage: number, currentSortColumn: string, isDesc: boolean) {
    this.payload = {
      pageSize: pageSize,
      currentPage: currentPage,
      currentSortColumn: currentSortColumn,
      isDesc: isDesc
    };
  }
}

export class GetDeliveriesSuccess implements Action {
  readonly type = GET_DELIVERIES_SUCCESS;
  readonly payload: object;
  constructor(deliveries, pageSize: number, currentPage: number, currentSortColumn: string, isDesc: boolean) {
    this.payload = {
      deliveries: deliveries,
      pageSize: pageSize,
      currentPage: currentPage,
      currentSortColumn: currentSortColumn,
      isDesc: isDesc
    };
  }
}

export class PaginateDeliveries implements Action {
  readonly type = PAGINATE_DELIVERIES;
  readonly payload: object;
  constructor(pageSize: number, currentPage: number, currentSortColumn: string, isDesc: boolean) {
    this.payload = {
      pageSize: pageSize,
      currentPage: currentPage,
      currentSortColumn: currentSortColumn,
      isDesc: isDesc
    };
  }
}

export class PaginateDeliveriesSuccess implements Action {
  readonly type = PAGINATE_DELIVERIES_SUCCESS;
  readonly payload: object;
  constructor(pageSize: number, currentPage: number, currentSortColumn: string, isDesc: boolean) {
    this.payload = {
      pageSize: pageSize,
      currentPage: currentPage,
      currentSortColumn: currentSortColumn,
      isDesc: isDesc
    };
  }
}

export class GetDeliveriesError implements Action {
  readonly type = GET_DELIVERIES_ERROR;
  readonly payload: object;
  constructor(error) {
    this.payload = {
      error: error
    };
  }
}

export class FilterDeliveries implements Action {
  readonly type = FILTER_DELIVERIES;
  readonly payload: object;
  constructor(pageSize: number, currentPage: number, property: string, filterText: string, currentSortColumn: string, isDesc: boolean) {
    this.payload = {
      pageSize: pageSize,
      currentPage: currentPage,
      property: property,
      filterText: filterText,
      currentSortColumn: currentSortColumn,
      isDesc: isDesc
    };
  }
}

export class DeleteDelivery implements Action {
  readonly type = DELETE_DELIVERY;
  readonly payload: object;
  constructor(deliveryID, pageSize: number, currentPage: number, currentSortColumn: string, isDesc: boolean, allDeliveries: Array<any>) {
    this.payload = {
      deliveryID: deliveryID,
      pageSize: pageSize,
      currentPage: currentPage,
      currentSortColumn: currentSortColumn,
      isDesc: isDesc,
      allDeliveries: allDeliveries
    };
  }
}

export class DeleteDeliverySuccess implements Action {
  readonly type = DELETE_DELIVERY_SUCCESS;
  readonly payload: object;
  constructor(deliveries, pageSize: number, currentPage: number, currentSortColumn: string, isDesc: boolean) {
    this.payload = {
      deliveries: deliveries,
      pageSize: pageSize,
      currentPage: currentPage,
      currentSortColumn: currentSortColumn,
      isDesc: isDesc
    };
  }
}

export class SaveNewDelivery implements Action {
  readonly type = SAVE_NEW_DELIVERY;
  readonly payload: object;
  constructor(delivery) {
    this.payload = {
      delivery: delivery
    };
  }
}

export class SaveEditedDelivery implements Action {
  readonly type = SAVE_EDITED_DELIVERY;
  readonly payload: object;
  constructor(delivery, deliveryID) {
    this.payload = {
      delivery: delivery,
      deliveryID: deliveryID
    };
  }
}

export type Actions
  = GetDeliveries
  | GetDeliveriesSuccess
  | GetDeliveriesError
  | DeleteDelivery
  | DeleteDeliverySuccess;
