import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
//cosa del carrito:
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatBadgeModule} from '@angular/material/badge';
//
import { IonicModule } from '@ionic/angular';

import { RelojdigPageRoutingModule } from './relojdig-routing.module';

import { RelojdigPage } from './relojdig.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RelojdigPageRoutingModule,
    MatBadgeModule, 
    MatButtonModule, 
    MatIconModule,
  ],
  declarations: [RelojdigPage]
})
export class RelojdigPageModule {
  hidden = false;
  
  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }
}
