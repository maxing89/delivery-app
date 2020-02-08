import * as homeActions from './home.actions';

import { Delivery, DeliveryInitValue } from '../delivery/delivery.models';

export interface State {
  deliveries: Array<any>;
  allDeliveries: Array<any>;
  deliveriesLength: number;
  loading: boolean;
  create: boolean;
  error?: string;
}

const initialState: State = {
  deliveries: [],
  allDeliveries: [],
  deliveriesLength: null,
  loading: false,
  create: false
};

function sortDeliveries(deliveries, property, isDesc) {
    const deliveriesMutable = [...deliveries];
    const sortedDeliveries = deliveriesMutable.sort(function(a, b) {
      if (!isDesc) {
        if (a[property] > b[property]) {
          return 1;
        } else {
          if (a[property] === b[property]) {
            return 0;
          } else {
            return -1;
          }
        }
      } else {
        if (b[property] > a[property]) {
          return 1;
        } else {
          if (a[property] === b[property]) {
            return 0;
          } else {
            return -1;
          }
        }
      }
    });
    return sortedDeliveries;
}

function paginatedDeliveries(deliveries: Array<any>, pageSize: number, currentPage: number, currentSortColumn: string, isDesc: boolean) {
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize - 1, deliveries.length - 1);
  const sortedDeliveries = sortDeliveries(deliveries, currentSortColumn, isDesc);
  const paginatedDeliveries = sortedDeliveries.slice(startIndex, endIndex + 1);
  return paginatedDeliveries;
}

function filterDeliveries(
  allDeliveries: Array<any>, pageSize: number, currentPage: number,
  property: string, filterText: string, currentSortColumn: string,
  isDesc: boolean) {
  const filterTextLowerCase = (filterText) ? filterText.toLowerCase() : '';
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize - 1, allDeliveries.length - 1);
  const filteredDeliveries = allDeliveries.filter(delivery => {
    if (!filterTextLowerCase) {
      return allDeliveries;
    } else {
      return delivery[property].toLowerCase().includes(filterTextLowerCase);
    }
  });
  if (!filterTextLowerCase) {
    const sortedDeliveries = paginatedDeliveries(filteredDeliveries, pageSize, currentPage, currentSortColumn, isDesc);
    return sortedDeliveries.slice(startIndex, endIndex + 1);
  } else {
    return filteredDeliveries.slice(startIndex, endIndex + 1);
  }
}

function saveNewDelivery(delivery, allDeliveries: Array<any>) {
  const newDelivery = {
    id: allDeliveries[allDeliveries.length - 1].id + 1,
    nombre: delivery.nombre,
    direccion: delivery.direccion,
    telefono: delivery.telefono,
    descripcion: delivery.descripcion,
    especialidades: delivery.especialidades,
    horarioApertura: delivery.horarioApertura,
    horarioClausura: delivery.horarioClausura,
    nombreAdmin: delivery.nombreAdmin,
    apellidoAdmin: delivery.apellidoAdmin,
    telefonoAdmin: delivery.telefonoAdmin,
    emailAdmin: delivery.emailAdmin,
    nombreComercial: delivery.nombreComercial,
    apellidoComercial: delivery.apellidoComercial,
    telefonoComercial: delivery.emailComercial,
    emailComercial: delivery.emailComercial
  }; // This is not a good practice, but since there's no backend and
    // this is a sealed object,this is the only way to do it...
  const allDeliveriesAux = [];
  for (const delivery of allDeliveries) {
    allDeliveriesAux.push(delivery);
  }
  allDeliveriesAux.push(newDelivery);
  return allDeliveriesAux;
}

function saveEditedDelivery(delivery: Delivery, deliveryID: number, allDeliveries: Array<any>) {
  let i = null;
  const allDeliveriesAux = [];
  const deliveryAux = {
    id: null,
    nombre: null,
    direccion: null,
    telefono: null,
    descripcion: null,
    especialidades: null,
    horarioApertura: null,
    horarioClausura: null,
    nombreAdmin: null,
    apellidoAdmin: null,
    telefonoAdmin: null,
    emailAdmin: null,
    nombreComercial: null,
    apellidoComercial: null,
    telefonoComercial: null,
    emailComercial: null,
  };
  for (const deli of allDeliveries) {
    allDeliveriesAux.push(deli);
  }
  allDeliveriesAux.forEach((deli, index) => {
    if (deli.id === Number(deliveryID)) {
      i = index;
      deliveryAux.id = Number(deliveryID);
      deliveryAux.nombre = delivery.nombre;
      deliveryAux.telefono = delivery.telefono;
      deliveryAux.descripcion = delivery.descripcion;
      deliveryAux.especialidades = delivery.especialidades;
      deliveryAux.direccion = delivery.direccion;
      deliveryAux.horarioApertura = delivery.horarioApertura;
      deliveryAux.horarioClausura = delivery.horarioClausura;
      deliveryAux.nombreAdmin = delivery.nombreAdmin;
      deliveryAux.apellidoAdmin = delivery.apellidoAdmin;
      deliveryAux.telefonoAdmin = delivery.telefonoAdmin;
      deliveryAux.emailAdmin = delivery.emailAdmin;
      deliveryAux.nombreComercial = delivery.nombreComercial;
      deliveryAux.apellidoComercial = delivery.apellidoComercial;
      deliveryAux.telefonoComercial = delivery.telefonoComercial;
      deliveryAux.emailComercial = delivery.emailComercial;
    }
  });
  allDeliveriesAux[i] = deliveryAux;
  return allDeliveriesAux;
}

export function reducer(state: any = initialState, action): State {

  switch (action.type) {
    case homeActions.GET_DELIVERIES:
      return {
        ...state,
        error: null,
        loading: true
      };
    case homeActions.GET_DELIVERIES_SUCCESS:
      return {
        ...state,
        loading: false,
        deliveries: (state.create) ? paginatedDeliveries(
          state.allDeliveries, action.payload.pageSize, action.payload.currentPage,
          action.payload.currentSortColumn, action.payload.isDesc
        ) : paginatedDeliveries(
          action.payload.deliveries, action.payload.pageSize, action.payload.currentPage,
          action.payload.currentSortColumn, action.payload.isDesc),
        deliveriesLength: state.allDeliveries.length,
        allDeliveries: (state.create) ? state.allDeliveries : action.payload.deliveries
      };
    case homeActions.PAGINATE_DELIVERIES:
      return {
        ...state,
        error: null,
        loading: true
      };
    case homeActions.PAGINATE_DELIVERIES_SUCCESS:
      return {
        ...state,
        loading: false,
        deliveries: (state.create) ? paginatedDeliveries(
          state.allDeliveries, action.payload.pageSize, action.payload.currentPage,
          action.payload.currentSortColumn, action.payload.isDesc
        ) : paginatedDeliveries(
          action.payload.deliveries, action.payload.pageSize, action.payload.currentPage,
          action.payload.currentSortColumn, action.payload.isDesc),
      };
    case homeActions.GET_DELIVERIES_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    case homeActions.FILTER_DELIVERIES:
      return {
        ...state,
        deliveries: filterDeliveries(
          state.allDeliveries, action.payload.pageSize, action.payload.currentPage,
          action.payload.property, action.payload.filterText, action.payload.currentSortColumn,
          action.payload.isDesc
        )
      };
    case homeActions.DELETE_DELIVERY:
      return {
        ...state,
        error: null,
        loading: true
      };
    case homeActions.DELETE_DELIVERY_SUCCESS:
      return {
        ...state,
        loading: false,
        deliveries: paginatedDeliveries(
          action.payload.deliveries, action.payload.pageSize, action.payload.currentPage,
          action.payload.currentSortColumn, action.payload.isDesc
        ),
        deliveriesLength: action.payload.deliveries.length,
        allDeliveries: action.payload.deliveries
      };
    case homeActions.SAVE_NEW_DELIVERY:
      return {
        ...state,
        allDeliveries: saveNewDelivery(action.payload.delivery, state.allDeliveries),
        create: true
      };
    case homeActions.SAVE_EDITED_DELIVERY:
      return {
        ...state,
        allDeliveries: saveEditedDelivery(action.payload.delivery, action.payload.deliveryID, state.allDeliveries),
        create: true
      };
    default:
      return state;
  }
}

export const getDeliveries = (state: State) => state.deliveries;
export const getAllDeliveries = (state: State) => state.allDeliveries;
export const getDeliveriesLength = (state: State) => state.deliveriesLength;
export const getLoading = (state: State) => state.loading;
