import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Ai4Page } from './ai4.page';

const routes: Routes = [
  {
    path: '',
    component: Ai4Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Ai4PageRoutingModule {}
