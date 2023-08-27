import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
//cosa del carrito:
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatBadgeModule} from '@angular/material/badge';
//
import { IonicModule } from '@ionic/angular';

import { Rs5PageRoutingModule } from './rs5-routing.module';

import { Rs5Page } from './rs5.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Rs5PageRoutingModule,
    MatBadgeModule, 
    MatButtonModule, 
    MatIconModule,
  ],
  declarations: [Rs5Page]
})
export class Rs5PageModule {
  hidden = false;
  
  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }
}
