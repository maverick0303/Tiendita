import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.page.html',
  styleUrls: ['./inicio-sesion.page.scss'],
})
export class InicioSesionPage {
  rol: number = 0;
  gmail: string = '';
  password: string = '';

  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);

  constructor(private router: Router, private toastController: ToastController) { }

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

  inicio_sesion() {
    if ((this.gmail === 'admin@gmail.com' && this.password === 'Admin123.') ||
        (this.gmail === 'usuario@gmail.com' && this.password === 'Usuario123.')) {
      this.rol = (this.gmail === 'admin@gmail.com') ? 2 : 1;
      this.irADatosPersonales(this.gmail);
    } else {
      this.presentToast();
      return;
    }
  }

  irADatosPersonales(correo: string) {
    const navigationExtras: NavigationExtras = {
      state: {
        roles: this.rol,
        correo: correo,
      },
    };
    this.router.navigate(['/datos-personales'], navigationExtras);
  }
}
