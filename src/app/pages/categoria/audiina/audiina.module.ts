import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
//cosa del carrito:
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatBadgeModule} from '@angular/material/badge';
//
import { IonicModule } from '@ionic/angular';

import { AudiinaPageRoutingModule } from './audiina-routing.module';

import { AudiinaPage } from './audiina.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AudiinaPageRoutingModule,
    MatBadgeModule, 
    MatButtonModule, 
    MatIconModule,
    ComponentsModule
  ],
  declarations: [AudiinaPage]
})
export class AudiinaPageModule {
  hidden = false;
  
  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }
}
