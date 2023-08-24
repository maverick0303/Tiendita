import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Ai5Page } from './ai5.page';

const routes: Routes = [
  {
    path: '',
    component: Ai5Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Ai5PageRoutingModule {}
