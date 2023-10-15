import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';
import { BdserviceService } from 'src/app/services/bd.service';
import { Usuario } from 'src/app/services/usuario';

@Component({
  selector: 'app-recuperar-clave',
  templateUrl: './recuperar-clave.page.html',
  styleUrls: ['./recuperar-clave.page.scss'],
})
export class RecuperarClavePage implements OnInit {
  idEnviado: string = '';
  pregunta: number = 0;
  respuesta: string = '';
  usuarioPregunta: number = 0;
  correo: string = '';
  idPregunta: string = '';

  contrasenaN: string = '';
  contrasena1: string = '';
  contrasena2: string = '';
  contrasena3: string = '';

  errors = {
    password: '',
    confirmPassword: ''
  };
  formularioValido: boolean = false;

  arregloPreguntas: any = [
    {
      idPregunta: '',
      nombrePregunta: ''
    }
  ];

  constructor(
    private router: Router,
    private toastController: ToastController,
    private bdService: BdserviceService
  ) {
    this.idEnviado = localStorage.getItem('idUsuario1')!;
    this.correo = localStorage.getItem('correoUC')!;

    this.bdService.dbState().subscribe(res => {
      if (res) {
        this.bdService.fetchPregunta().subscribe(datos => {
          this.arregloPreguntas = datos;
        });
      }
    });
  }

  ngOnInit() {
    this.bdService.buscarCorreo(this.idEnviado).then(usuario => {
      if (usuario) {
        this.idEnviado = usuario.correoU;
      }
    });
  }
  async onSubmit() {
    const validado = await this.validarRes();
    if (validado) {
      await this.insertar();
    } else {
      this.mostrarMensaje('La respuesta no está validada');
      this.router.navigate(['/recuperar-clave'])
    }
  }

  async modificarContrasena() {
    let usuario = {
      correoU: this.idEnviado,
      contrasena: this.contrasenaN
    };

    let navigationExtras: NavigationExtras = {
      state: {
        idEnviado: this.idEnviado,
        contrasena: this.contrasena3
      }
    };

    this.router.navigate(['/inicio-sesion'], navigationExtras);
  }

  valiPassword(event: KeyboardEvent) {
    const input = event.key;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.]).{5,15}$/;

    if (input !== "Backspace" && !passwordRegex.test(input)) {
      event.preventDefault();
    }
    this.verificarFormulario();
  }

  verificarFormulario() {
    let hasError = false;

    this.errors.password = '';
    if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{5,15}$/.test(this.contrasena1)) {
      this.errors.password = 'La contraseña no cumple con los requisitos.';
      hasError = true;
    }

    this.errors.confirmPassword = '';
    if (this.contrasena1 !== this.contrasena2) {
      this.errors.confirmPassword = 'Las contraseñas no coinciden.';
      hasError = true;
    }

    if (
      !this.contrasena1 ||
      !this.contrasena2
    ) {
      hasError = true;
    }

    this.formularioValido = !hasError;
  }

  async insertar() {
    this.bdService.claveNueva(
      this.idEnviado,
      this.contrasena1
    );
  }

  async validarRes(): Promise<boolean> {
    try {
      const usuario: Usuario | null = await this.bdService.buscarCorreo(this.correo);
      if (usuario !== null) {
        if (usuario.respuestaU === this.respuesta) {
          this.bdService.isDBReady.next(true);
          this.mostrarMensaje('Respuesta correcta');
          return true; // La validación fue exitosa
        } else {
          this.mostrarMensaje('La respuesta es incorrecta');
          return false; // La validación falló
        }
      } else {
        this.mostrarMensaje('No se encontró un usuario con ese correo');
        return false; // La validación falló
      }
    } catch (error) {
      console.error('Error al verificar la base de datos', error);
      this.mostrarMensaje('Ocurrió un error al verificar la base de datos');
      return false; // La validación falló
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
