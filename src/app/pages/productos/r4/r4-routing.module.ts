import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { R4Page } from './r4.page';

const routes: Routes = [
  {
    path: '',
    component: R4Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class R4PageRoutingModule {}
