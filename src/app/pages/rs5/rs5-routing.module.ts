import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Rs5Page } from './rs5.page';

const routes: Routes = [
  {
    path: '',
    component: Rs5Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Rs5PageRoutingModule {}
