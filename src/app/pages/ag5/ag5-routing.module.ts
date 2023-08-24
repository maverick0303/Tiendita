import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Ag5Page } from './ag5.page';

const routes: Routes = [
  {
    path: '',
    component: Ag5Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Ag5PageRoutingModule {}
