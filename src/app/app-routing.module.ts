import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    data: {
      title: 'Mi Negocio'
    },
    children: [
      // {
      //   path: '',
      //   component: HomeComponent,
      //   pathMatch: 'full'
      // },
      {
        path: 'categorias-productos',
        loadChildren: () => import('./categorias-productos/categorias-productos.module').then(m => m.CategoriaProductoModule)
      },
    ],
  },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
