import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RelojdigPageRoutingModule } from './relojdig-routing.module';

import { RelojdigPage } from './relojdig.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RelojdigPageRoutingModule
  ],
  declarations: [RelojdigPage]
})
export class RelojdigPageModule {}
