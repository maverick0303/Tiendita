import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MDatosPage } from './m-datos.page';

const routes: Routes = [
  {
    path: '',
    component: MDatosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MDatosPageRoutingModule {}
