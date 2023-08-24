import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Rd3Page } from './rd3.page';

const routes: Routes = [
  {
    path: '',
    component: Rd3Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Rd3PageRoutingModule {}
