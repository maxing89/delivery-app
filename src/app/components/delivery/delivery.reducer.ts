import * as deliveryActions from './delivery.actions';
import { Delivery, DeliveryInitValue } from './delivery.models';

export interface State {
  delivery: Delivery;
  loading: boolean;
  error?: string;
}

const initialState: State = {
  delivery: DeliveryInitValue,
  loading: false,
};

function searchDelivery(delivery, deliveries: Array<any>) {
  for (const deli of deliveries) {
    if (deli.id === delivery.id) {
      return deli;
    }
  }
}

export function reducer(state: any = initialState, action): State {

  switch (action.type) {
    case deliveryActions.GET_DELIVERY:
      return {
        ...state,
        error: null,
        loading: true
      };
    case deliveryActions.GET_DELIVERY_SUCCESS:
      return {
        ...state,
        loading: false,
        delivery: searchDelivery(action.payload.delivery, action.payload.deliveries)
      };
    case deliveryActions.GET_DELIVERY_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    case deliveryActions.CREATE_DELIVERY:
      return {
        ...state,
        error: null,
        loading: true
      };
    case deliveryActions.CREATE_DELIVERY_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case deliveryActions.CREATE_DELIVERY_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    case deliveryActions.EDIT_DELIVERY:
      return {
        ...state,
        error: null,
        loading: true
      };
    case deliveryActions.EDIT_DELIVERY_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case deliveryActions.EDIT_DELIVERY_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    case deliveryActions.RESET_DELIVERY:
      return {
        ...state,
        delivery: DeliveryInitValue
      };
    default:
      return state;
  }
}

export const getDelivery = (state: State) => state.delivery;
export const getLoadingDelivery = (state: State) => state.loading;
