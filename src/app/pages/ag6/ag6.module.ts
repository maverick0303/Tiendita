import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Ag6PageRoutingModule } from './ag6-routing.module';

import { Ag6Page } from './ag6.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ag6PageRoutingModule
  ],
  declarations: [Ag6Page]
})
export class Ag6PageModule {}
