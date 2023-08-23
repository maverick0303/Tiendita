import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RelojsmaPageRoutingModule } from './relojsma-routing.module';

import { RelojsmaPage } from './relojsma.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RelojsmaPageRoutingModule
  ],
  declarations: [RelojsmaPage]
})
export class RelojsmaPageModule {}
