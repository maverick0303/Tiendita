import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

  //FUNCIÓN PARA QUE NO SE PUEDAN HACER ESPACIOS
  onKeyDowns(event: KeyboardEvent) {
    if (event.key === ' ') {
      event.preventDefault(); 
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
  onKeyDown(event: KeyboardEvent) {
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
  
  
  
  
}
