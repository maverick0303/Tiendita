import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Rs4PageRoutingModule } from './rs4-routing.module';

import { Rs4Page } from './rs4.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Rs4PageRoutingModule
  ],
  declarations: [Rs4Page]
})
export class Rs4PageModule {}
