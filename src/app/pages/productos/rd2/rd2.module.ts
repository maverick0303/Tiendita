import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Rd2PageRoutingModule } from './rd2-routing.module';

import { Rd2Page } from './rd2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Rd2PageRoutingModule
  ],
  declarations: [Rd2Page]
})
export class Rd2PageModule {}
