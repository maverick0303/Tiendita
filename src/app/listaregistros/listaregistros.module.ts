import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaregistrosPageRoutingModule } from './listaregistros-routing.module';

import { ListaRegistrosPage } from './listaregistros.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaregistrosPageRoutingModule
  ],
  declarations: [ListaRegistrosPage]
})
export class ListaregistrosPageModule {}
