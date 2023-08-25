import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { R6PageRoutingModule } from './r6-routing.module';

import { R6Page } from './r6.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    R6PageRoutingModule
  ],
  declarations: [R6Page]
})
export class R6PageModule {}
