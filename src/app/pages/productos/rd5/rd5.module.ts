import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
//cosa del carrito:
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatBadgeModule} from '@angular/material/badge';
//
import { IonicModule } from '@ionic/angular';

import { Rd5PageRoutingModule } from './rd5-routing.module';

import { Rd5Page } from './rd5.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Rd5PageRoutingModule,
    MatBadgeModule, 
    MatButtonModule, 
    MatIconModule,
  ],
  declarations: [Rd5Page]
})
export class Rd5PageModule {
  hidden = false;
  
  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }
}
