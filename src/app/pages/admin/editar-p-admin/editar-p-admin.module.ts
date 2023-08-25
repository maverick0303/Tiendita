import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarPAdminPageRoutingModule } from './editar-p-admin-routing.module';

import { EditarPAdminPage } from './editar-p-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarPAdminPageRoutingModule
  ],
  declarations: [EditarPAdminPage]
})
export class EditarPAdminPageModule {}
