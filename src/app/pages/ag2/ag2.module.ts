import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Ag2PageRoutingModule } from './ag2-routing.module';

import { Ag2Page } from './ag2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ag2PageRoutingModule
  ],
  declarations: [Ag2Page]
})
export class Ag2PageModule {}
