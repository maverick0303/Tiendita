import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Ag3Page } from './ag3.page';

const routes: Routes = [
  {
    path: '',
    component: Ag3Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Ag3PageRoutingModule {}
