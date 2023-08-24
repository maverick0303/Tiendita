import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Rd1Page } from './rd1.page';

const routes: Routes = [
  {
    path: '',
    component: Rd1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Rd1PageRoutingModule {}
