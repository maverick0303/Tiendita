import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MDatosPageRoutingModule } from './m-datos-routing.module';

import { MDatosPage } from './m-datos.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MDatosPageRoutingModule,
    ComponentsModule
  ],
  declarations: [MDatosPage]
})
export class MDatosPageModule {}
