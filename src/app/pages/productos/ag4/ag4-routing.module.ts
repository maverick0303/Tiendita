import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Ag4Page } from './ag4.page';

const routes: Routes = [
  {
    path: '',
    component: Ag4Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Ag4PageRoutingModule {}
