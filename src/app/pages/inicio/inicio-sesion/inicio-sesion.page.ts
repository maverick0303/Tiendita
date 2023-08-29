import { Component } from '@angular/core';
//animaciones:
import { FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { ToastController } from '@ionic/angular';

//


@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.page.html',
  styleUrls: ['./inicio-sesion.page.scss'],
})
export class InicioSesionPage {
  rol: number = 0;
  gmail: string = "";
  password: string = "";


  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Debes ingresar un email:)';
    }

    return this.email.hasError('email') ? 'No es un email valido' : '';
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Los datos proporcionados no coinciden',
      duration: 950,
      position: 'middle',

    });

    await toast.present();
  }

  
  inicio_sesion () {
    if (this.gmail == "admin@gmail.com" && this.password == "Admin123.") {
      //poner redireccion
      this.rol = 2;
      
    } else if (this.gmail == "usuario@gmail.com" && this.password == "Usuario123.") {
      this.rol = 1;
      
    }
    else {
      // poner mensaje de error
      this.presentToast();
      return;
    }
    let navigationExtras: NavigationExtras = {
      state:{
        roles: this.rol
      }
      
    }
    this.router.navigate(['/tienda'], navigationExtras);
  }
  constructor(private router: Router, private toastController: ToastController, ) { }

}