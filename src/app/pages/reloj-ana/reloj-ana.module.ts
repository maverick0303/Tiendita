import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RelojAnaPageRoutingModule } from './reloj-ana-routing.module';

import { RelojAnaPage } from './reloj-ana.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RelojAnaPageRoutingModule
  ],
  declarations: [RelojAnaPage]
})
export class RelojAnaPageModule {}
