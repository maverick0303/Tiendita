import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaginaerrorPageRoutingModule } from './paginaerror-routing.module';

import { PaginaerrorPage } from './paginaerror.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaginaerrorPageRoutingModule
  ],
  declarations: [PaginaerrorPage]
})
export class PaginaerrorPageModule {}
