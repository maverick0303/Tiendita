import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Ai6Page } from './ai6.page';

const routes: Routes = [
  {
    path: '',
    component: Ai6Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Ai6PageRoutingModule {}
