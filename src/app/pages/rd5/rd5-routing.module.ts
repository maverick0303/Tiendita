import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Rd5Page } from './rd5.page';

const routes: Routes = [
  {
    path: '',
    component: Rd5Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Rd5PageRoutingModule {}
