import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Rs1PageRoutingModule } from './rs1-routing.module';

import { Rs1Page } from './rs1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Rs1PageRoutingModule
  ],
  declarations: [Rs1Page]
})
export class Rs1PageModule {}
