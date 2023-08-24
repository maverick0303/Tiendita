import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Rd1PageRoutingModule } from './rd1-routing.module';

import { Rd1Page } from './rd1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Rd1PageRoutingModule
  ],
  declarations: [Rd1Page]
})
export class Rd1PageModule {}
