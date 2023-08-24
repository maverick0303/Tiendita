import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.page.html',
  styleUrls: ['./inicio-sesion.page.scss'],
})
export class InicioSesionPage implements OnInit {
  email: string = ''; // Inicialización de la variable email
  password: string = ''; // Inicialización de la variable password

  constructor() { }

  ngOnInit() {
  }

  onLogin() {
    if (this.email && this.password) {
      // Aquí puedes agregar la lógica para el inicio de sesión
      console.log('Iniciar sesión con:', this.email, this.password);
    }
  }
}
