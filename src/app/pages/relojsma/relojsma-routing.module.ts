import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RelojsmaPage } from './relojsma.page';

const routes: Routes = [
  {
    path: '',
    component: RelojsmaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RelojsmaPageRoutingModule {}
