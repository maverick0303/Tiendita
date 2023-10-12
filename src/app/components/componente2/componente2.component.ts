import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-componente2',
  templateUrl: './componente2.component.html',
  styleUrls: ['./componente2.component.scss'],
})
export class Componente2Component  implements OnInit {
  idRol: number;

  constructor() {this.idRol = parseInt(localStorage.getItem('idRol')!);}

  ngOnInit() {}
  cerrarSesion() {
    localStorage.clear(); // Limpiar el localStorage
    window.location.href = '/'; // Redirigir a la página principal
  }
  

}
