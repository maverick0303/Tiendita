import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Rs2Page } from './rs2.page';

const routes: Routes = [
  {
    path: '',
    component: Rs2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Rs2PageRoutingModule {}
