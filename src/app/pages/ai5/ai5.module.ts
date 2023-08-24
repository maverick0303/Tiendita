import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Ai5PageRoutingModule } from './ai5-routing.module';

import { Ai5Page } from './ai5.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ai5PageRoutingModule
  ],
  declarations: [Ai5Page]
})
export class Ai5PageModule {}
