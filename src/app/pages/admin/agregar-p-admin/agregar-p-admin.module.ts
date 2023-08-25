import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarPAdminPageRoutingModule } from './agregar-p-admin-routing.module';

import { AgregarPAdminPage } from './agregar-p-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarPAdminPageRoutingModule
  ],
  declarations: [AgregarPAdminPage]
})
export class AgregarPAdminPageModule {}
