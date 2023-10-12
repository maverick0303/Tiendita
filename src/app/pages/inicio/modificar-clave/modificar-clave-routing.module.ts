import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModificarClavePage } from './modificar-clave.page';

const routes: Routes = [
  {
    path: '',
    component: ModificarClavePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModificarClavePageRoutingModule {}
