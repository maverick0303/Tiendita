import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Rs6Page } from './rs6.page';

const routes: Routes = [
  {
    path: '',
    component: Rs6Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Rs6PageRoutingModule {}
