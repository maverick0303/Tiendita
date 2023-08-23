import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AudigamerPage } from './audigamer.page';

const routes: Routes = [
  {
    path: '',
    component: AudigamerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AudigamerPageRoutingModule {}
