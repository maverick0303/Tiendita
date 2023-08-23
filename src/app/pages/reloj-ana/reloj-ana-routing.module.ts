import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RelojAnaPage } from './reloj-ana.page';

const routes: Routes = [
  {
    path: '',
    component: RelojAnaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RelojAnaPageRoutingModule {}
