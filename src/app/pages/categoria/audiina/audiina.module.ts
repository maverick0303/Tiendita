import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AudiinaPageRoutingModule } from './audiina-routing.module';

import { AudiinaPage } from './audiina.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AudiinaPageRoutingModule
  ],
  declarations: [AudiinaPage]
})
export class AudiinaPageModule {}
