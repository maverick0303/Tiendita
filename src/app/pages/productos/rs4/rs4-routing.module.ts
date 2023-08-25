import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Rs4Page } from './rs4.page';

const routes: Routes = [
  {
    path: '',
    component: Rs4Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Rs4PageRoutingModule {}
