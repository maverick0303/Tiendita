import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { R1Page } from './r1.page';

const routes: Routes = [
  {
    path: '',
    component: R1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class R1PageRoutingModule {}
