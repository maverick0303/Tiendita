import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Ai2Page } from './ai2.page';

const routes: Routes = [
  {
    path: '',
    component: Ai2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Ai2PageRoutingModule {}
