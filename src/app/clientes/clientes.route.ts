import { Routes } from '@angular/router';
import {ClientesComponent} from './clientes.component';
import { PagingParamsResolve } from '../util/paging-params-resolve';


export const clientesRoutes: Routes = [
  {
   path: '',
   component: ClientesComponent,
   resolve:{
       paginParams: PagingParamsResolve
   },
   data:{
       title: 'Clientes'
   }
  }
];