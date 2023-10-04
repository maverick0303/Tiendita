import { Component, OnInit } from '@angular/core';
import { CarritoService } from 'src/app/services/carrito.service'; // Importa el servicio del carrito

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {
  productosEnCarrito: any[] = []; // Declara la propiedad para los productos en el carrito

  constructor(private carritoService: CarritoService) { }

  ngOnInit() {
    this.productosEnCarrito = this.carritoService.getProductosEnCarrito(); // Obtiene los productos del carrito
  }

  calcularTotal(): number {
    // Implementa la lógica para calcular el total de la compra
    let total = 0;
    for (const producto of this.productosEnCarrito) {
      total += producto.precio;
    }
    return total;
  }

  vaciarCarrito() {
    this.carritoService.vaciarCarrito(); // Llama al método para vaciar el carrito del servicio
    this.productosEnCarrito = []; // Limpia la lista de productos en el carrito
  }
}
