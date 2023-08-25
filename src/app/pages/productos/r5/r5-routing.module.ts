import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { R5Page } from './r5.page';

const routes: Routes = [
  {
    path: '',
    component: R5Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class R5PageRoutingModule {}
