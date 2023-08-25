import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Rd5PageRoutingModule } from './rd5-routing.module';

import { Rd5Page } from './rd5.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Rd5PageRoutingModule
  ],
  declarations: [Rd5Page]
})
export class Rd5PageModule {}
