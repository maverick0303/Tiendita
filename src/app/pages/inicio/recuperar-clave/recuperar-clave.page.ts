import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { BdserviceService } from 'src/app/services/bd.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-recuperar-clave',
  templateUrl: './recuperar-clave.page.html',
  styleUrls: ['./recuperar-clave.page.scss'],
})
export class RecuperarClavePage implements OnInit {
  correo: string = '';
  pregunta: string = '';
  respuesta: string = '';
  preguntaEncontrada: boolean = false;

  preguntasSeguridad: string[] = [
    "¿Cuál es tu película favorita?",
    "¿Nombre de tu mascota?",
    "¿Color favorito?"
  ];

  constructor(private router: Router, private toastController: ToastController, private bdService: BdserviceService) {
    this.correo = localStorage.getItem('correoUC')!;
    
  }

  ngOnInit() {
  }

  validarPreguntaSeguridad() {
    if (this.preguntasSeguridad.includes(this.pregunta)) {
      this.preguntaEncontrada = true;
      // Llamar al servicio de base de datos para verificar la pregunta
      this.bdService.verificarPregunta(this.correo, this.pregunta)
        .then(preguntaValida => {
          if (preguntaValida) {
            this.mostrarMensaje('La pregunta coincide');
          } else {
            this.mostrarMensaje('La pregunta proporcionada no es válida');
          }
        })
        .catch(error => {
          console.error('Error al verificar la pregunta en la base de datos', error);
          this.mostrarMensaje('Ocurrió un error al verificar la pregunta');
        });
    } else {
      this.mostrarMensaje('La pregunta seleccionada no es válida');
    }
  }
  

  validarRespuesta() {
    this.bdService.verificarRespuesta(this.respuesta,this.correo)
      .then(respuestaValida => {
        if (respuestaValida) {
          this.mostrarMensaje('La respuesta coincide')
        } else {
          this.mostrarMensaje('La respuesta proporcionada no es válida');
        }
      })
      .catch(error => {
        console.error('Error al verificar la respuesta en la base de datos', error);
        this.mostrarMensaje('Ocurrió un error al verificar la respuesta');
      });
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
