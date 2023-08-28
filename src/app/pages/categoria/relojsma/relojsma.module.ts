import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
//cosa del carrito:
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatBadgeModule} from '@angular/material/badge';
//
import { IonicModule } from '@ionic/angular';

import { RelojsmaPageRoutingModule } from './relojsma-routing.module';

import { RelojsmaPage } from './relojsma.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RelojsmaPageRoutingModule,
    MatBadgeModule, 
    MatButtonModule, 
    MatIconModule,ComponentsModule
  ],
  declarations: [RelojsmaPage]
})
export class RelojsmaPageModule {
  hidden = false;
  
  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }
}
