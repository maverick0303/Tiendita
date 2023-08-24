import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Ag5PageRoutingModule } from './ag5-routing.module';

import { Ag5Page } from './ag5.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ag5PageRoutingModule
  ],
  declarations: [Ag5Page]
})
export class Ag5PageModule {}
