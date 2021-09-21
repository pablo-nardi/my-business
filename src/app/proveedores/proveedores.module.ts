import { NgModule } from '@angular/core';
import { ProveedorComponent } from './proveedores.component';
import { RouterModule } from '@angular/router';
import { productoRoutes } from './proveedores.route';
import { SharedModule } from '../shared/shared.module';
import { DetailProveedorComponent } from './detail-proveedores.component';
import { UpdateProveedorComponent } from './update-proveedores.component';
import { DeleteProveedorModalComponent } from './delete-proveedores-modal.component';

@NgModule({
  declarations: [ProveedorComponent, DetailProveedorComponent, UpdateProveedorComponent, DeleteProveedorModalComponent],
  imports: [SharedModule, RouterModule.forChild(productoRoutes)],
  entryComponents: [DeleteProveedorModalComponent]
})
export class ProveedorModule {}
