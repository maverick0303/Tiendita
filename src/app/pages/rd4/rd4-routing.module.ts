import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Rd4Page } from './rd4.page';

const routes: Routes = [
  {
    path: '',
    component: Rd4Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Rd4PageRoutingModule {}
