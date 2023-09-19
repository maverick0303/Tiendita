import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  nombreUValue: string = '';
  apellidoUValue: string = '';
  rutValue: string = '';
  emailValue: string = '';
  passwordValue: string = '';
  confirmPasswordValue: string = '';
  preguntaSeguridad: string = '';
  respuestaSeguridad: string = '';
  formularioValido: boolean = false; // Agrega esta línea

  constructor(private router: Router) { }

  ngOnInit() {
    // Inicialización aquí...
  }
  //validacion del nombre
  valiNombre(event: KeyboardEvent) {
    const input = event.key;
    const regex = /^[A-Za-z]+$/; // Solo permite letras

    if (!regex.test(input)) {
      event.preventDefault(); // No permite que ingrese caracteres no válidos
    }
  }
  //validacion del apellido
  ValiApellido(event: KeyboardEvent) {
    const input = event.key;
    const apellido = /^[A-Za-z]+$/; // Solo permite letras

    if (!apellido.test(input)) {
      event.preventDefault(); // No permite que ingrese caracteres no válidos
    }
  }
  //validar el rut:
  valiRut(event: KeyboardEvent) {
    const input = event.key;

    // Verifica si el input es un número o una 'k' (puede ser minúscula o mayúscula)
    const regex = /^[0-9kK]$/i;

    if (!regex.test(input)) {
      event.preventDefault(); // No permite caracteres no válidos
    } else {
      // Comprueba si el input es un número o una 'k' para agregar punto y guión automáticamente
      if (input.match(/[0-9kK]/i)) {
        if (this.rutValue.length === 1) {
          this.rutValue = this.rutValue + '.';
        } else if (this.rutValue.length === 5 || this.rutValue.length === 9) {
          this.rutValue = this.rutValue + '.';
        } else if (this.rutValue.length === 13) {
          this.rutValue = this.rutValue + '-';
        }
      }
    }
  }

  autoCompleteRut() {
    // Formatea el RUT con puntos y guión si es válido
    const rutRegex = /^(\d{1,2}(\.\d{3}){2})-([\dkK])$/i;
    if (rutRegex.test(this.rutValue)) {
      this.rutValue = this.rutValue.replace(/(\d{1,2})(\d{3})(\d{3})-([\dkK])/i, '$1.$2.$3-$4');
      this.verificarFormulario();
    }
  }
  //VALIDAR EL CORREO:
  valiEmail(event: KeyboardEvent) {
    const input = event.key;

    // Expresión regular para validar un correo electrónico
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!regex.test(input)) {
      event.preventDefault(); // No permite caracteres no válidos
    }
  }
  //validar la contraseña:
  valiPassword(event: KeyboardEvent) {
    const input = event.key;

    // Expresión regular para validar la contraseña
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])(?!.*[.]{2,}).{5,15}$/;

    if (!passwordRegex.test(input) && !passwordRegex.test(input)) {
      event.preventDefault(); // No permite caracteres no válidos
    }
  }

  //verifica si los campos son correctos
  verificarFormulario() {
    // Verificar si el campo de nombre solo contiene letras
    const regex = /^[A-Za-z]+$/;
    this.formularioValido = regex.test(this.nombreUValue) && this.nombreUValue.length >= 1 && this.nombreUValue.length <= 15;
    //apellido
    const apellido = /^[A-Za-z]+$/;
    this.formularioValido = apellido.test(this.apellidoUValue) && this.apellidoUValue.length >= 1 && this.apellidoUValue.length <= 15;
    // Verificar si el RUT es válido
    const rutRegex = /^\d{1,2}\.\d{3}\.\d{3}-[\dkK]$/i;
    this.formularioValido = rutRegex.test(this.rutValue);
    //CORREO:
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    this.formularioValido = rutRegex.test(this.rutValue) && emailRegex.test(this.emailValue);
    // Verificar si la contraseña es válida
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,15}$/;
    this.formularioValido = rutRegex.test(this.rutValue) && emailRegex.test(this.emailValue) && passwordRegex.test(this.passwordValue);
    //VALIDAR CLAVE REPETIDA:
    this.formularioValido = rutRegex.test(this.rutValue) && emailRegex.test(this.emailValue) && passwordRegex.test(this.passwordValue) && this.passwordValue === this.confirmPasswordValue;
    //PREGUNTA:
    this.formularioValido = rutRegex.test(this.rutValue) && emailRegex.test(this.emailValue) && passwordRegex.test(this.passwordValue) && this.passwordValue === this.confirmPasswordValue && this.preguntaSeguridad !== '' && this.respuestaSeguridad !== '';
  }
  //redirigir a la pagina:
  irAPaginaSiguiente() {
    if (this.formularioValido) {
      const navigationExtras: NavigationExtras = {
        state: {
          nombreEnviado: this.nombreUValue,
          apellidoEnviado: this.apellidoUValue,
          rutEnviado: this.rutValue,
          emailEnviado: this.emailValue,
          passwordEnviado: this.passwordValue
        }
      };
      this.router.navigate(['/datos-personales'], navigationExtras);
    }
  }
}
