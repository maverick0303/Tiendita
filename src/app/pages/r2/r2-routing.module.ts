import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { R2Page } from './r2.page';

const routes: Routes = [
  {
    path: '',
    component: R2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class R2PageRoutingModule {}
