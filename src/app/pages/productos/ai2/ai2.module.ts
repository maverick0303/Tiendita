import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Ai2PageRoutingModule } from './ai2-routing.module';

import { Ai2Page } from './ai2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ai2PageRoutingModule
  ],
  declarations: [Ai2Page]
})
export class Ai2PageModule {}
