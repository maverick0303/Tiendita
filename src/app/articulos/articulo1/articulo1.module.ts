import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Articulo1PageRoutingModule } from './articulo1-routing.module';

import { Articulo1Page } from './articulo1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Articulo1PageRoutingModule
  ],
  declarations: [Articulo1Page]
})
export class Articulo1PageModule {}
