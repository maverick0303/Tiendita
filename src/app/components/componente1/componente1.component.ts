import { Component, OnInit } from '@angular/core';
import { CarritoService } from 'src/app/services/carrito.service';

@Component({
  selector: 'app-componente1',
  templateUrl: './componente1.component.html',
  styleUrls: ['./componente1.component.scss'],
})
export class Componente1Component implements OnInit {
  idRol: number;
  productosEnCarrito: any[] = [];
  cantidad: number = 0; // Inicializa la cantidad en 0

  constructor(private carritoService: CarritoService) {this.idRol = parseInt(localStorage.getItem('idRol')!);}

  ngOnInit() {
    this.productosEnCarrito = this.carritoService.getProductosEnCarrito();
    
    // Suscribirse al observable cantidad$ para recibir actualizaciones
    this.carritoService.cantidad$.subscribe((cantidad) => {
      this.cantidad = cantidad;
    });
  }
}
