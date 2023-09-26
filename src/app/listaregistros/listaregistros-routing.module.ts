import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaRegistrosPage } from './listaregistros.page';

const routes: Routes = [
  {
    path: '',
    component: ListaRegistrosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaregistrosPageRoutingModule {}
