import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AudigamerPageRoutingModule } from './audigamer-routing.module';

import { AudigamerPage } from './audigamer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AudigamerPageRoutingModule
  ],
  declarations: [AudigamerPage]
})
export class AudigamerPageModule {}
