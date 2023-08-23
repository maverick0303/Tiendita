import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarPadminPageRoutingModule } from './editar-padmin-routing.module';

import { EditarPadminPage } from './editar-padmin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarPadminPageRoutingModule
  ],
  declarations: [EditarPadminPage]
})
export class EditarPadminPageModule {}
