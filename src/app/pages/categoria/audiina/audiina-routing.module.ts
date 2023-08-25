import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AudiinaPage } from './audiina.page';

const routes: Routes = [
  {
    path: '',
    component: AudiinaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AudiinaPageRoutingModule {}
