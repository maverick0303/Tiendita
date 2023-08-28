import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
//cosa del carrito:
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatBadgeModule} from '@angular/material/badge';
//
import { IonicModule } from '@ionic/angular';

import { Rs3PageRoutingModule } from './rs3-routing.module';

import { Rs3Page } from './rs3.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Rs3PageRoutingModule,
    MatBadgeModule, 
    MatButtonModule, 
    MatIconModule,ComponentsModule
  ],
  declarations: [Rs3Page]
})
export class Rs3PageModule {
  hidden = false;
  
  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }
}
