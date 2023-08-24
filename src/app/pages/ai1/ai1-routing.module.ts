import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Ai1Page } from './ai1.page';

const routes: Routes = [
  {
    path: '',
    component: Ai1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Ai1PageRoutingModule {}
