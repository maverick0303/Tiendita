import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarPadminPage } from './editar-padmin.page';

const routes: Routes = [
  {
    path: '',
    component: EditarPadminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarPadminPageRoutingModule {}
