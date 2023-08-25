import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Rs3Page } from './rs3.page';

const routes: Routes = [
  {
    path: '',
    component: Rs3Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Rs3PageRoutingModule {}
