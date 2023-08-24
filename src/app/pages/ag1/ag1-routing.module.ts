import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Ag1Page } from './ag1.page';

const routes: Routes = [
  {
    path: '',
    component: Ag1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Ag1PageRoutingModule {}
