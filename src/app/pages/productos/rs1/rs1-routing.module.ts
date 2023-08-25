import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Rs1Page } from './rs1.page';

const routes: Routes = [
  {
    path: '',
    component: Rs1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Rs1PageRoutingModule {}
