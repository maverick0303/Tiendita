import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
//cosa del carrito:
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatBadgeModule} from '@angular/material/badge';
//
import { IonicModule } from '@ionic/angular';

import { ListaUsuarioPageRoutingModule } from './lista-usuario-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { ListaUsuarioPage } from './lista-usuario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatBadgeModule, 
    MatButtonModule, 
    MatIconModule,
    ListaUsuarioPageRoutingModule,ComponentsModule
  ],
  declarations: [ListaUsuarioPage]
})
export class ListaUsuarioPageModule {}
