import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RelojdigPage } from './relojdig.page';

const routes: Routes = [
  {
    path: '',
    component: RelojdigPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RelojdigPageRoutingModule {}
