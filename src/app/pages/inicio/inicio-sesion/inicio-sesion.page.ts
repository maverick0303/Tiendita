import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.page.html',
  styleUrls: ['./inicio-sesion.page.scss'],
})
export class InicioSesionPage {

  email: string = '';
  password: string = '';

  constructor(private alertController: AlertController) {}

  async validatePassword() {
    if (this.password.includes(' ')) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'La contraseña no puede contener espacios en blanco.',
        buttons: ['OK']
      });

      await alert.present();
    } else {
      this.onLogin();
    }
  }

  onLogin() {
    if (this.email && this.password) {
      // Aquí puedes agregar la lógica para el inicio de sesión
      console.log('Iniciar sesión con:', this.email, this.password);
    }
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === ' ') {
      event.preventDefault(); // Evita que la barra espaciadora sea escrita en el campo
    }
  }
}
