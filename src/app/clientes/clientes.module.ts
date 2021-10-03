import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {clientesRoutes} from './clientes.route';

import {ClientesComponent} from './clientes.component';
import {DeleteClientesModalComponent} from './delete-clientes-modal.component';





@NgModule({
  declarations: [ClientesComponent, DeleteClientesModalComponent], // here
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(clientesRoutes)
  ]
})
export class ClientesModule { }
