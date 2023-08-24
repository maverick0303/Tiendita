import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { R4PageRoutingModule } from './r4-routing.module';

import { R4Page } from './r4.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    R4PageRoutingModule
  ],
  declarations: [R4Page]
})
export class R4PageModule {}
