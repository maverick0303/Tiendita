import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Rs2PageRoutingModule } from './rs2-routing.module';

import { Rs2Page } from './rs2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Rs2PageRoutingModule
  ],
  declarations: [Rs2Page]
})
export class Rs2PageModule {}
