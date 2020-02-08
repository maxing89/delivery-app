export class User {
  _id: number;
  _login: string;
  _fullName: string;
  _email: string;
}

export class MockUser {
  _id?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
}

export class Delivery {
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
