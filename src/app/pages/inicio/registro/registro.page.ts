import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  email: string = ''; 
  password: string = ''; 
  nombreUValue: string = '';
  apellidoUValue: string = '';
  rutUValue: string = '';
  respuestaUValue: string = '';
  preguntaUValue: string = '';
  confirmPassword: string = '';

  constructor(private router: Router) { }

  ngOnInit() {
    // Inicialización aquí...
  }

  //FUNCIÓN PARA QUE NO SE PUEDAN HACER ESPACIOS en la contraseña
  espacioContra(event: KeyboardEvent) {
    if (event.key === ' ') {
      event.preventDefault(); 
    }
  }
  valiNombre(event: KeyboardEvent) {
    const input = event.key;
    const regex = /^[A-Za-z]+$/; //solo permitir letras

    if (!regex.test(input)) {
      event.preventDefault(); //No permite que ingrese espacio
    }
  }

  valiApellido(event: KeyboardEvent) {
    const input = event.key;
    const regex = /^[A-Za-z]+$/; //solo permitir letras

    if (!regex.test(input)) {
      event.preventDefault(); //No permite que ingrese espacio
    }
  }

  

  //LOGICA DEL INICIO DE SESIÓN
  onLogin() {
    if (this.email && this.password) {
      // Lógica para el inicio de sesión
      console.log('Iniciar sesión con:', this.email, this.password);
    }
  }

  // Primera validación del rut
  validateRutU(rut: string): boolean {
    if (rut === "") {
      return false;
    } else {
      return /^\d{1,2}\.\d{3}\.\d{3}-[\dkK]$/.test(rut);
    }
  }

  // Segunda validación del rut
  validarut(event: KeyboardEvent) {
    const caretPosition = (<HTMLInputElement>event.target).selectionStart;
    const inputNumber = event.key;
  
    if (
      inputNumber === ' ' ||
      (caretPosition === 0 && !/^\d$/.test(inputNumber) && inputNumber !== 'Backspace') ||
      (caretPosition === 1 && !/^\d$/.test(inputNumber) && inputNumber !== 'Backspace') ||
      (caretPosition === 2 && inputNumber !== '.' && inputNumber !== 'Backspace') ||
      (caretPosition === 3 && !/^\d$/.test(inputNumber) && inputNumber !== 'Backspace') ||
      (caretPosition === 4 && !/^\d$/.test(inputNumber) && inputNumber !== 'Backspace') ||
      (caretPosition === 5 && !/^\d$/.test(inputNumber) && inputNumber !== 'Backspace') ||
      (caretPosition === 6 && inputNumber !== '.' && inputNumber !== 'Backspace') ||
      (caretPosition === 7 && !/^\d$/.test(inputNumber) && inputNumber !== 'Backspace') ||
      (caretPosition === 8 && !/^\d$/.test(inputNumber) && inputNumber !== 'Backspace') ||
      (caretPosition === 9 && !/^\d$/.test(inputNumber) && inputNumber !== 'Backspace') ||
      (caretPosition === 10 && inputNumber !== '-' && inputNumber !== 'Backspace') ||
      (caretPosition === 11 && !/^[\dkK0-9]$/.test(inputNumber) && inputNumber !== 'Backspace')
    ) {
      event.preventDefault();
    }
  }

  validatePasswordMatch(): boolean {
    return this.password === this.confirmPassword;
  }

  // Método para navegar a otra página con datos
  irAPaginaSiguiente() {
    const navigationExtras: NavigationExtras = {
      state: {
        nombreEnviado: this.nombreUValue,
        apellidoEnviado: this.apellidoUValue,
        rutEnviado: this.rutUValue,
        correoEnviado: this.email
      }
    };
  
    this.router.navigate(['/datos-personales'], navigationExtras);
  }



  
}
