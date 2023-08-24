import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { R2PageRoutingModule } from './r2-routing.module';

import { R2Page } from './r2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    R2PageRoutingModule
  ],
  declarations: [R2Page]
})
export class R2PageModule {}
