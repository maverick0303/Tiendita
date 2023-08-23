import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductoadminPageRoutingModule } from './productoadmin-routing.module';

import { ProductoadminPage } from './productoadmin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductoadminPageRoutingModule
  ],
  declarations: [ProductoadminPage]
})
export class ProductoadminPageModule {}
