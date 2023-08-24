import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Ai1PageRoutingModule } from './ai1-routing.module';

import { Ai1Page } from './ai1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ai1PageRoutingModule
  ],
  declarations: [Ai1Page]
})
export class Ai1PageModule {}
