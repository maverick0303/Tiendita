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

  onKeyDown(event: KeyboardEvent) {
  const caretPosition = (<HTMLInputElement>event.target).selectionStart;


if (event.key === ' ' || (caretPosition === 0 && event.key === '-') ||
 (caretPosition === 6 && event.key !== '.' && event.key !== 'Backspace') ||
  (caretPosition === 2 && event.key !== '.' && event.key !== 'Backspace') ||
  (caretPosition === 10 && event.key !== '-' && event.key !== 'Backspace')|| 
  
  //ARREGLAR ESTOOOOOOOOO
  (caretPosition === 11 && event.key === '0-9') || 
  (caretPosition === 11 && event.key !== 'k')) {
    event.preventDefault();
  }

  
}

  
  
}
