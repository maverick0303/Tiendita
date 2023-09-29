import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaUsuarioPageRoutingModule } from './lista-usuario-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { ListaUsuarioPage } from './lista-usuario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaUsuarioPageRoutingModule,ComponentsModule
  ],
  declarations: [ListaUsuarioPage]
})
export class ListaUsuarioPageModule {}
