import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Ai4PageRoutingModule } from './ai4-routing.module';

import { Ai4Page } from './ai4.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ai4PageRoutingModule
  ],
  declarations: [Ai4Page]
})
export class Ai4PageModule {}
