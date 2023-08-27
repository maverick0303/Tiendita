import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
//cosa del carrito:
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatBadgeModule} from '@angular/material/badge';
//
import { IonicModule } from '@ionic/angular';

import { RelojAnaPageRoutingModule } from './reloj-ana-routing.module';

import { RelojAnaPage } from './reloj-ana.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RelojAnaPageRoutingModule,
    MatBadgeModule, 
    MatButtonModule, 
    MatIconModule,
  ],
  declarations: [RelojAnaPage]
})
export class RelojAnaPageModule {
  hidden = false;
  
  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }
}
