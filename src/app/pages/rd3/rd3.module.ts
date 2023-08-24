import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Rd3PageRoutingModule } from './rd3-routing.module';

import { Rd3Page } from './rd3.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Rd3PageRoutingModule
  ],
  declarations: [Rd3Page]
})
export class Rd3PageModule {}
