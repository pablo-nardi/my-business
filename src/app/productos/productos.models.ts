import { ICategoriaProducto } from "../categorias-productos/categorias-productos.models";

export interface IProducto {
  id: number;
  descripcion: string;
  stock: number;
  cantidadMinima: number;
  activa: boolean;
  categoria: ICategoriaProducto;
}