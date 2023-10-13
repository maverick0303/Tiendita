import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { BdserviceService } from 'src/app/services/bd.service';
import { FormControl, Validators } from '@angular/forms';

interface Usuario {
  respuestaU: string;
  correoU: string;
}

@Component({
  selector: 'app-correo',
  templateUrl: './correo.page.html',
  styleUrls: ['./correo.page.scss'],
})
export class CorreoPage implements OnInit {
  correo: string = '';
  email = new FormControl('', [Validators.required, Validators.email]);
  correoEncontrado: boolean = false; 

  constructor(private router: Router, private toastController: ToastController, private bdService: BdserviceService) { }

  ngOnInit() {
  }

  async validarCorreoEnBD() {
    try {
      const usuario: Usuario | null = await this.bdService.buscarCorreo(this.correo);
      if (usuario !== null) {
        this.correoEncontrado = true;
        localStorage.setItem('correoUC', usuario.correoU);
        localStorage.setItem('respuestaU', usuario.respuestaU)
        this.bdService.isDBReady.next(true);
        this.router.navigate(['/recuperar-clave']);
      } else {
        this.mostrarMensaje('El correo no existe en la base de datos');
      }
    } catch (error) {
      console.error('Error al verificar el correo en la base de datos', error);
      this.getErrorMessage();
    }
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'No debe quedar vacío el campo';
    }
    return this.email.hasError('email') ? 'No es un email válido' : '';
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'La contraseña y el correo no son válidos',
      duration: 950,
      position: 'middle',
    });
    await toast.present();
  }

  async mostrarMensaje(mensaje: string): Promise<void> {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'top'
    });
    await toast.present();
  }
}
