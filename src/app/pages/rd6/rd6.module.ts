import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Rd6PageRoutingModule } from './rd6-routing.module';

import { Rd6Page } from './rd6.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Rd6PageRoutingModule
  ],
  declarations: [Rd6Page]
})
export class Rd6PageModule {}
