import { ICategoriaProducto } from "../categorias-productos/categorias-productos.models";

export interface IProducto {
  id: number;
  descripcion: string;
  stock: number;
  cantidadMinima: number;
  activo: boolean;
  Categoria: ICategoriaProducto;
}

export interface IProductoUpdate {
  id: number;
  descripcion: string;
  stock: number;
  cantidadMinima: number;
  activo: boolean;
  categoriaId: number;
}