import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { R6Page } from './r6.page';

const routes: Routes = [
  {
    path: '',
    component: R6Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class R6PageRoutingModule {}
