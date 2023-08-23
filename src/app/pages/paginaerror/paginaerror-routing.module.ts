import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaginaerrorPage } from './paginaerror.page';

const routes: Routes = [
  {
    path: '',
    component: PaginaerrorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaginaerrorPageRoutingModule {}
