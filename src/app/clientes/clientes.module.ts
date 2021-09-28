import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {clientesRoutes} from './clientes.route';

import {ClientesComponent} from './clientes.component';





@NgModule({
  declarations: [ClientesComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(clientesRoutes)
  ]
})
export class ClientesModule { }
