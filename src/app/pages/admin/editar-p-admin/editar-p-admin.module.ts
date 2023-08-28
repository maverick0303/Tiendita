import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
//cosa del carrito:
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatBadgeModule} from '@angular/material/badge';
//
import { IonicModule } from '@ionic/angular';

import { EditarPAdminPageRoutingModule } from './editar-p-admin-routing.module';

import { EditarPAdminPage } from './editar-p-admin.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarPAdminPageRoutingModule,
    MatBadgeModule, 
    MatButtonModule, 
    MatIconModule,
    ComponentsModule
  ],
  declarations: [EditarPAdminPage]
})
export class EditarPAdminPageModule {
  hidden = false;

  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }
}
