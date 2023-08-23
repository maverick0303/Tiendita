import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarPAdminPage } from './agregar-p-admin.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarPAdminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarPAdminPageRoutingModule {}
