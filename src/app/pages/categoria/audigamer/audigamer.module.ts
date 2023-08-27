import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
//cosa del carrito:
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatBadgeModule} from '@angular/material/badge';
//

import { IonicModule } from '@ionic/angular';

import { AudigamerPageRoutingModule } from './audigamer-routing.module';

import { AudigamerPage } from './audigamer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AudigamerPageRoutingModule,
    MatBadgeModule, 
    MatButtonModule, 
    MatIconModule,
  ],
  declarations: [AudigamerPage]
})
export class AudigamerPageModule {
    hidden = false;
  
    toggleBadgeVisibility() {
      this.hidden = !this.hidden;
    }
}
