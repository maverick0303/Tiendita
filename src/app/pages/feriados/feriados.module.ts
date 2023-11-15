import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from 'src/app/components/components.module';
import { FeriadosPageRoutingModule } from './feriados-routing.module';

import { FeriadosPage } from './feriados.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    FeriadosPageRoutingModule
  ],
  declarations: [FeriadosPage]
})
export class FeriadosPageModule {}
