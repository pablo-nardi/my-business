import { Routes } from '@angular/router';
import { DetailProductoComponent } from './detail-productos.component';
import { UpdateProductoComponent } from './update-productos.component';
import { ProductoComponent } from './productos.component';
import { PagingParamsResolve } from '../util/paging-params-resolve';

export const productoRoutes: Routes = [
  {
    path: '',
    component: ProductoComponent,
    resolve: {
      pagingParams: PagingParamsResolve
  },
    data: {
      title: 'Productos',
    },
  },
  {
    path: 'new',
    component: UpdateProductoComponent,
    data: {
      title: 'Crear Producto',
    },
  },
  {
    path: ':id/edit',
    component: UpdateProductoComponent,
    data: {
      title: 'Actualizar Producto',
    },
  },
  {
    path: ':id/view',
    component: DetailProductoComponent,
    data: {
      title: 'Detalle de Producto',
    },
  }
];