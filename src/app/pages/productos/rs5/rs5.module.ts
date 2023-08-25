import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Rs5PageRoutingModule } from './rs5-routing.module';

import { Rs5Page } from './rs5.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Rs5PageRoutingModule
  ],
  declarations: [Rs5Page]
})
export class Rs5PageModule {}
