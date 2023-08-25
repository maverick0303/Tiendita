import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Ai3Page } from './ai3.page';

const routes: Routes = [
  {
    path: '',
    component: Ai3Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Ai3PageRoutingModule {}
