import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
//cosa del carrito:
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatBadgeModule} from '@angular/material/badge';
//
import { IonicModule } from '@ionic/angular';

import { R3PageRoutingModule } from './r3-routing.module';

import { R3Page } from './r3.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    R3PageRoutingModule,
    MatBadgeModule, 
    MatButtonModule, 
    MatIconModule,
  ],
  declarations: [R3Page]
})
export class R3PageModule {
  hidden = false;
  
  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }
}
