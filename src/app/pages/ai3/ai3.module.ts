import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Ai3PageRoutingModule } from './ai3-routing.module';

import { Ai3Page } from './ai3.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ai3PageRoutingModule
  ],
  declarations: [Ai3Page]
})
export class Ai3PageModule {}
