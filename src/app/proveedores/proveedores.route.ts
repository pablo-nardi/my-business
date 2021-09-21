import { Routes } from '@angular/router';
import { DetailProveedorComponent } from './detail-proveedores.component';
import { UpdateProveedorComponent } from './update-proveedores.component';
import { ProveedorComponent } from './proveedores.component';
import { PagingParamsResolve } from '../util/paging-params-resolve';

export const productoRoutes: Routes = [
  {
    path: '',
    component: ProveedorComponent,
    resolve: {
      pagingParams: PagingParamsResolve
  },
    data: {
      title: 'Proveedores',
    },
  },
  {
    path: 'new',
    component: UpdateProveedorComponent,
    data: {
      title: 'Crear Proveedor',
    },
  },
  {
    path: ':id/edit',
    component: UpdateProveedorComponent,
    data: {
      title: 'Actualizar Proveedor',
    },
  },
  {
    path: ':id/view',
    component: DetailProveedorComponent,
    data: {
      title: 'Detalle de Proveedor',
    },
  }
];