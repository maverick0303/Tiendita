import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  productosEnCarrito: any[] = [];
  

  agregarProducto(producto: any) {
    this.productosEnCarrito.push(producto);
  }

  obtenerProductos() {
    return this.productosEnCarrito;
  }

  getProductosEnCarrito(): any[] {
    return this.productosEnCarrito;
  }
  agregarAlCarrito(producto: any) {
    this.productosEnCarrito.push(producto);
  }

  // Vaciar el carrito
  vaciarCarrito() {
    this.productosEnCarrito = [];
  }


  constructor() { }
}
