import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Rd6Page } from './rd6.page';

const routes: Routes = [
  {
    path: '',
    component: Rd6Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Rd6PageRoutingModule {}
