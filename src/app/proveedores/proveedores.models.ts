export interface IProveedor {
  id: number;
  razonSocial: string;
  cuitDni: number;
  telefono?: string;
  email?: string;
  direccion?: string;
  activo: boolean;
}
