import { Component } from '@angular/core';
//animaciones:
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';

//


@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.page.html',
  styleUrls: ['./inicio-sesion.page.scss'],
})
export class InicioSesionPage {
   hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Debes ingresar un email:)';
    }

    return this.email.hasError('email') ? 'No es un email valido' : '';
  }





  constructor() {}

}