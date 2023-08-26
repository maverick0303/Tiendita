import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//animaciones:
import { FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
//clave:
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
//

import { IonicModule } from '@ionic/angular';

import { InicioSesionPageRoutingModule } from './inicio-sesion-routing.module';

import { InicioSesionPage } from './inicio-sesion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InicioSesionPageRoutingModule,
    //correo
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    //clave:
    MatFormFieldModule,
    MatInputModule, 
    MatButtonModule, 
    MatIconModule,

  ],
  declarations: [InicioSesionPage]
})
export class InicioSesionPageModule {
}

