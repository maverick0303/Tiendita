import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Ai6PageRoutingModule } from './ai6-routing.module';

import { Ai6Page } from './ai6.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ai6PageRoutingModule
  ],
  declarations: [Ai6Page]
})
export class Ai6PageModule {}
