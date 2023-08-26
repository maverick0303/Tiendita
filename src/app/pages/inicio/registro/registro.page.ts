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

  validatePasswordMatch(): boolean {
    return this.password === this.confirmPassword;
  }

  // Segunda validación del rut
  onKeyDown(event: KeyboardEvent) {
    const caretPosition = (<HTMLInputElement>event.target).selectionStart;
    const inputChar = event.key;

    if (
      inputChar === ' ' ||
      (caretPosition === 0 && inputChar === '-') ||
      (caretPosition === 6 && inputChar !== '.' && inputChar !== 'Backspace') ||
      (caretPosition === 2 && inputChar !== '.' && inputChar !== 'Backspace') ||
      (caretPosition === 10 && inputChar !== '-' && inputChar !== 'Backspace') ||
      (caretPosition === 11 && !/^[\dkK0-9]$/.test(inputChar))
    ) {
      event.preventDefault();
    }
  }
}
