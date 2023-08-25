import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Rd4PageRoutingModule } from './rd4-routing.module';

import { Rd4Page } from './rd4.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Rd4PageRoutingModule
  ],
  declarations: [Rd4Page]
})
export class Rd4PageModule {}
