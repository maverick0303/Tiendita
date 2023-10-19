import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { BdserviceService } from 'src/app/services/bd.service';
import { Storage } from '@ionic/storage-angular';
import { Usuario } from 'src/app/services/usuario';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-nuevo-admin',
  templateUrl: './nuevo-admin.page.html',
  styleUrls: ['./nuevo-admin.page.scss'],
})
export class NuevoAdminPage implements OnInit {

  usuarios: any;

  nombreUValue: string = '';
  apellidoUValue: string = '';
  rutValue: string = '';
  emailValue: string = '';
  passwordValue: string = '';
  confirmPasswordValue: string = '';
  respuestaSeguridad: string = '';
  idRol = 2;
  idVenta = 1;
  fotoU: string = '';
  usuarioPregunta: number = 0;
  errors = {
    nombreU: '',
    apellidoU: '',
    rut: '',
    email: '',
    password: '',
    confirmPassword: '',
    respuestaSeguridad: '',
    usuarioPregunta: ''
  };

  arregloPreguntas: any = [
    {
      idPregunta: '',
      nombrePregunta: ''
    }
  ]

  formularioValido: boolean = false;

  constructor(private alertController: AlertController,private router: Router, private bd: BdserviceService, private storage: Storage) { }
  ngOnInit() {
    //subscribo al observable de la BD
    this.bd.dbState().subscribe(res => {
      if (res) {
        this.bd.fetchPregunta().subscribe(datos => {
          this.arregloPreguntas = datos;
        });
        this.bd.fetchUsuario().subscribe(data => {
          this.usuarios = data; // Actualizo la lista de usuarios
        });
      }
    });



  }

  valiNombre(event: KeyboardEvent) {
    const input = event.key;
    const regex = /^[A-Za-z]+$/; // Solo permite letras

    if (!regex.test(input)) {
      event.preventDefault(); // No permite que ingrese caracteres no válidos
      this.errors.nombreU = 'El nombre solo debe contener letras.';
    } else {
      this.errors.nombreU = '';
    }
    this.verificarFormulario();
  }

  ValiApellido(event: KeyboardEvent) {
    const input = event.key;
    const apellido = /^[A-Za-z]+$/; // Solo permite letras

    if (!apellido.test(input)) {
      event.preventDefault(); // No permite que ingrese caracteres no válidos
      this.errors.apellidoU = 'El apellido solo debe contener letras.';
    } else {
      this.errors.apellidoU = '';
    }
    this.verificarFormulario();
  }

  valiRut(event: KeyboardEvent) {
    const input = event.key;
  
    // Verifica si el input es un número o una 'k' (puede ser minúscula o mayúscula)
    const regex = /^[0-9kK]$/i;
  
    if (!regex.test(input) && input !== 'Backspace') {
      event.preventDefault(); // No permite caracteres no válidos excepto Backspace
    } else if (input !== 'Backspace') {
      if (input.match(/[0-9kK]/i)) {
        if (this.rutValue.length === 2 || this.rutValue.length === 6) {
          this.rutValue = this.rutValue + '.';
        } else if (this.rutValue.length === 10) {
          this.rutValue = this.rutValue + '-';
        }
  
        if (this.rutValue.length > 11) {
          event.preventDefault(); // No permite más caracteres después de la posición 11
        }
        if (this.rutValue.length === 12 && input === '0') {
          this.rutValue = this.rutValue.slice(0, -1) + 'k';
          event.preventDefault(); 
        }
      }
    }
  }
  
  async valiEmail(event: KeyboardEvent) {
    const input = event.key;
  
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
    if (input !== "Backspace" && !regex.test(input)) {
      event.preventDefault(); // No permite caracteres no válidos
    }
  
    // Si el input es un correo electrónico válido
    if (regex.test(this.emailValue)) {
      try {
        const usuario = await this.bd.verificarCorreoExistente(this.emailValue);
        if (usuario !== null) {
          // El correo electrónico ya está registrado
          this.mostrarAlerta('Correo ya registrado', 'El correo electrónico ya está asociado a una cuenta.');
          this.formularioValido = false; // Desactivar el formulario
        } else {
          this.formularioValido = true; // Habilitar el formulario
        }
      } catch (error) {
        console.error('Error al verificar la base de datos', error);
        this.mostrarAlerta('Error', 'Ocurrió un error al verificar la base de datos');
      }
    } else {
      this.formularioValido = false; // Desactivar el formulario si el correo no es válido
    }
  
    this.verificarFormulario();
  }
  
  
  
  

  valiPassword(event: KeyboardEvent) {
    const input = event.key;

    // Expresión regular para validar la contraseña permitiendo "."
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.]).{5,15}$/;

    if (input !== "Backspace" && !passwordRegex.test(input)) {
      event.preventDefault(); // No permite caracteres no válidos
    }
    this.verificarFormulario();
  }

  verificarFormulario() {
    let hasError = false;

    // Validación del nombre
    this.errors.nombreU = '';
    if (!/^[A-Za-z]+$/.test(this.nombreUValue) || this.nombreUValue.length < 1 || this.nombreUValue.length > 15) {
      this.errors.nombreU = 'El nombre solo debe contener letras y tener entre 1 y 15 caracteres.';
      hasError = true;
    }

    // Validación del apellido
    this.errors.apellidoU = '';
    if (!/^[A-Za-z]+$/.test(this.apellidoUValue) || this.apellidoUValue.length < 1 || this.apellidoUValue.length > 15) {
      this.errors.apellidoU = 'El apellido solo debe contener letras y tener entre 1 y 15 caracteres.';
      hasError = true;
    }

    // Validación del RUT
    this.errors.rut = '';
    if (!/^(\d{1,2}(\.\d{3}){2}-[\dkK])$/i.test(this.rutValue)) {
      this.errors.rut = 'El RUT no tiene un formato válido.';
      hasError = true;
    }

    // Validación del correo electrónico
    this.errors.email = '';
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(this.emailValue)) {
      this.errors.email = 'El correo electrónico no tiene un formato válido.';
      hasError = true;
    }

    // Validación de la contraseña
    this.errors.password = '';
    if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{5,15}$/.test(this.passwordValue)) {
      this.errors.password = 'La contraseña no cumple con los requisitos.';
      hasError = true;
    }

    // Validación de la confirmación de contraseña
    this.errors.confirmPassword = '';
    if (this.passwordValue !== this.confirmPasswordValue) {
      this.errors.confirmPassword = 'Las contraseñas no coinciden.';
      hasError = true;
    }

    // Validación de la pregunta de seguridad
    this.errors.usuarioPregunta = this.usuarioPregunta ? '' : 'La pregunta es obligatoria';
    hasError = !this.usuarioPregunta || hasError; // Agregar la condición aquí

    // Validación de la respuesta de seguridad
    this.errors.respuestaSeguridad = this.respuestaSeguridad ? '' : 'La respuesta es obligatoria.';
    hasError = !this.respuestaSeguridad || hasError;

    // Validación adicional para comprobar si todos los campos requeridos están llenos
    if (
      !this.nombreUValue ||
      !this.apellidoUValue ||
      !this.rutValue ||
      !this.emailValue ||
      !this.passwordValue ||
      !this.confirmPasswordValue ||
      !this.respuestaSeguridad ||
      !this.usuarioPregunta
    ) {
      hasError = true;
    }

    this.formularioValido = !hasError;
  }

  insertar() {
    this.bd.insertarUsuario(
      this.nombreUValue,
      this.apellidoUValue,
      this.rutValue,
      this.emailValue,
      this.passwordValue,
      this.idRol,
      this.respuestaSeguridad,
      this.idVenta,
      this.fotoU,
      this.usuarioPregunta
    );
  }

  async mostrarAlerta(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK']
    });
  
    await alert.present();
  }
}
