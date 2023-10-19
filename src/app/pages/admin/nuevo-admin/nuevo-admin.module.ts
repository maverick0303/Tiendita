import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NuevoAdminPageRoutingModule } from './nuevo-admin-routing.module';

import { NuevoAdminPage } from './nuevo-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NuevoAdminPageRoutingModule
  ],
  declarations: [NuevoAdminPage]
})
export class NuevoAdminPageModule {}
