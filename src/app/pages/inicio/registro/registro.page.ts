import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { BdserviceService } from 'src/app/services/bd.service';
import { Storage } from '@ionic/storage-angular';
import { Usuario } from 'src/app/services/usuario';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {


  usuarios: any;

  nombreUValue: string = '';
  apellidoUValue: string = '';
  rutValue: string = '';
  emailValue: string = '';
  passwordValue: string = '';
  confirmPasswordValue: string = '';
  preguntaSeguridad: string = '';
  respuestaSeguridad: string = '';
  idRol = 1;
  idVenta = 1;
  fotoU: string = '';

  errors = {
    nombreU: '',
    apellidoU: '',
    rut: '',
    email: '',
    password: '',
    confirmPassword: '',
    preguntaSeguridad: '',
    respuestaSeguridad: '',
  };

  arregloPreguntas: any = [
    {
      idPregunta: '',
      nombrePregunta: ''
    }
  ]

  formularioValido: boolean = false;

  constructor(private router: Router, private bd: BdserviceService, private storage: Storage) { }
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
  
  
  
  
  


  valiEmail(event: KeyboardEvent) {
    const input = event.key;

    // Expresión regular para validar un correo electrónico
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!regex.test(input)) {
      event.preventDefault(); // No permite caracteres no válidos
    }
    this.verificarFormulario();
  }

  valiPassword(event: KeyboardEvent) {
    const input = event.key;

    // Expresión regular para validar la contraseña permitiendo "."
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.]).{5,15}$/;

    if (!passwordRegex.test(input)) {
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
    this.errors.preguntaSeguridad = this.preguntaSeguridad ? '' : 'La pregunta es obligatoria';
    hasError = !this.preguntaSeguridad || hasError; // Agregar la condición aquí

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
      !this.preguntaSeguridad
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
      this.preguntaSeguridad,
      this.idVenta,
      this.fotoU
    );
  }
}
