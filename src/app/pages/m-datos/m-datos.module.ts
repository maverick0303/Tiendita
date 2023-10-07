import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MDatosPageRoutingModule } from './m-datos-routing.module';

import { MDatosPage } from './m-datos.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MDatosPageRoutingModule,
    ComponentsModule,MatBadgeModule, MatButtonModule, MatIconModule,
  ],
  declarations: [MDatosPage]
})
export class MDatosPageModule {}
