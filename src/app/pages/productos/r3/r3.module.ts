import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { R3PageRoutingModule } from './r3-routing.module';

import { R3Page } from './r3.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    R3PageRoutingModule
  ],
  declarations: [R3Page]
})
export class R3PageModule {}
