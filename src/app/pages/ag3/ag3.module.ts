import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Ag3PageRoutingModule } from './ag3-routing.module';

import { Ag3Page } from './ag3.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ag3PageRoutingModule
  ],
  declarations: [Ag3Page]
})
export class Ag3PageModule {}
