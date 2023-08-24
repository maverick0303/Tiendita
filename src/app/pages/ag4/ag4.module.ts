import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Ag4PageRoutingModule } from './ag4-routing.module';

import { Ag4Page } from './ag4.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ag4PageRoutingModule
  ],
  declarations: [Ag4Page]
})
export class Ag4PageModule {}
