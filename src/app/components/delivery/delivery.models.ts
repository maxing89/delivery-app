export interface Delivery {
  id: number;
  nombre: string;
  telefono: string;
  descripcion: string;
  especialidades: string;
  direccion: string;
  horarioApertura: string;
  horarioClausura: string;
  nombreAdmin: string;
  apellidoAdmin: string;
  telefonoAdmin: string;
  emailAdmin: string;
  nombreComercial: string;
  apellidoComercial: string;
  telefonoComercial: string;
  emailComercial: string;
}

export const DeliveryInitValue: Delivery = {
  id: null,
  nombre: null,
  telefono: null,
  descripcion: null,
  especialidades: null,
  direccion: null,
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
