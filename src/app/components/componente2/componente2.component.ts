import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/services/usuario';

@Component({
  selector: 'app-componente2',
  templateUrl: './componente2.component.html',
  styleUrls: ['./componente2.component.scss'],
})
export class Componente2Component  implements OnInit {
  idRol: number;

  constructor(private router: Router) {this.idRol = parseInt(localStorage.getItem('idRol')!);}

  ngOnInit() {}
  datosPersonales(){
  this.router.navigate(['/datos-personales',{idRol: this.idRol}]);
  }

  tienda(){
    this.router.navigate(['/tienda',{idRol: this.idRol}]);
      }

  historial(){
    this.router.navigate(['/historial',{idRol: this.idRol}]);
      }

  cerrarSesion() {
    window.location.href = 'tienda  '; 
    localStorage.clear(); // Limpiar el localStorage
    
  }
  

}
