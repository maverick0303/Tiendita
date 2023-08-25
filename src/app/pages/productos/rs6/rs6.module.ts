import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Rs6PageRoutingModule } from './rs6-routing.module';

import { Rs6Page } from './rs6.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Rs6PageRoutingModule
  ],
  declarations: [Rs6Page]
})
export class Rs6PageModule {}
