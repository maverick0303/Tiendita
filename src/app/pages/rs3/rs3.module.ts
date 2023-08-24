import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Rs3PageRoutingModule } from './rs3-routing.module';

import { Rs3Page } from './rs3.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Rs3PageRoutingModule
  ],
  declarations: [Rs3Page]
})
export class Rs3PageModule {}
