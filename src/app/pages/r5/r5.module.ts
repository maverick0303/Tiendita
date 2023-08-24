import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { R5PageRoutingModule } from './r5-routing.module';

import { R5Page } from './r5.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    R5PageRoutingModule
  ],
  declarations: [R5Page]
})
export class R5PageModule {}
