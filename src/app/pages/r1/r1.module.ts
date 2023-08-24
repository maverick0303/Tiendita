import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { R1PageRoutingModule } from './r1-routing.module';

import { R1Page } from './r1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    R1PageRoutingModule
  ],
  declarations: [R1Page]
})
export class R1PageModule {}
