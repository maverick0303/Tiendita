import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-componente1',
  templateUrl: './componente1.component.html',
  styleUrls: ['./componente1.component.scss'],
})
export class Componente1Component implements OnInit {
  idRol: number;
  productosEnCarrito: any[] = [];
  cantidad: number = 0; // Inicializa la cantidad en 0

  constructor() {this.idRol = parseInt(localStorage.getItem('idRol')!);}

  ngOnInit() {

  }
}
