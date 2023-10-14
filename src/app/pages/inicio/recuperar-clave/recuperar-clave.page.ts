import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { BdserviceService } from 'src/app/services/bd.service';
import { Usuario } from 'src/app/services/usuario';

@Component({
  selector: 'app-recuperar-clave',
  templateUrl: './recuperar-clave.page.html',
  styleUrls: ['./recuperar-clave.page.scss'],
})
export class RecuperarClavePage implements OnInit {
  correo: string = '';
  pregunta: string = '';
  respuesta: string = '';

  constructor(private router: Router, private toastController: ToastController, private bdService: BdserviceService) {
    this.correo = localStorage.getItem('correoUC')!;
    
  }

  ngOnInit() {
  }
  async validarPregunta() {
    try {
      const usuario: Usuario | null = await this.bdService.buscarCorreo(this.correo);
      if (usuario !== null) {
        if (usuario.nombrePregunta === this.pregunta) {
          this.bdService.isDBReady.next(true);
          this.mostrarMensaje('Pregunta correcta');
        } else {
          this.mostrarMensaje('La pregunta es incorrecta');
        }
      } else {
        this.mostrarMensaje('No se encontró un usuario con ese correo');
      }
    } catch (error) {
      console.error('error al verificar la base de datos', error);
      this.mostrarMensaje('Ocurrió un error al verificar la base de datos');
    }
  }
  

  async validarRes() {
    try {
      // Buscar el usuario por correo electrónico
      const usuario: Usuario | null = await this.bdService.buscarCorreo(this.correo);
  
      if (usuario !== null) {
        // Si se encontró el usuario, comparar la respuesta
        if (usuario.respuestaU === this.respuesta) {
          // Respuesta correcta
          this.bdService.isDBReady.next(true);
          this.mostrarMensaje('Respuesta correcta');
        } else {
          // Respuesta incorrecta
          this.mostrarMensaje('La respuesta es incorrecta');
        }
      } else {
        // No se encontró el usuario
        this.mostrarMensaje('No se encontró un usuario con ese correo');
      }
    } catch (error) {
      // Manejar errores
      console.error('Error al verificar la base de datos', error);
      this.mostrarMensaje('Ocurrió un error al verificar la base de datos');
    }
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
