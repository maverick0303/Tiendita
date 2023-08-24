import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Ag6Page } from './ag6.page';

const routes: Routes = [
  {
    path: '',
    component: Ag6Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Ag6PageRoutingModule {}
