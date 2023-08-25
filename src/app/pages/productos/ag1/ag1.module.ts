import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Ag1PageRoutingModule } from './ag1-routing.module';

import { Ag1Page } from './ag1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ag1PageRoutingModule
  ],
  declarations: [Ag1Page]
})
export class Ag1PageModule {}
