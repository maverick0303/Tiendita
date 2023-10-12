import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatBadgeModule} from '@angular/material/badge';
//
import { IonicModule } from '@ionic/angular';

import { ModificarClavePageRoutingModule } from './modificar-clave-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { ModificarClavePage } from './modificar-clave.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModificarClavePageRoutingModule,MatBadgeModule, 
    MatButtonModule, 
    MatIconModule,ComponentsModule
  ],
  declarations: [ModificarClavePage]
})
export class ModificarClavePageModule {
  hidden = false;

  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }
}
