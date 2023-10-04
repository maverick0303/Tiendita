import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  productosEnCarrito: any[] = [];
  cantidad: number = 1; // Agrega una propiedad para llevar el seguimiento de la cantidad
  private cantidadSubject = new BehaviorSubject<number>(0);
  cantidad$ = this.cantidadSubject.asObservable();

  agregarProducto(producto: any) {
    this.productosEnCarrito.push(producto);
    this.actualizarCantidad(); // Llamar a la función para actualizar la cantidad
  }
  actualizarCantidad() {
    this.cantidad = this.productosEnCarrito.length; // Actualizar la cantidad según la longitud del array
  }

  obtenerProductos() {
    return this.productosEnCarrito;
  }
  // Agrega un método para obtener la cantidad actual
  getCantidad(): number {
    return this.cantidad;
  }

  // Agrega un método para establecer la cantidad actual
  setCantidad(cantidad: number) {
    this.cantidad = cantidad;
  }
  verificarStock(producto: any, cantidadSeleccionada: number): boolean {
    return cantidadSeleccionada <= producto.stock;
  }


  getProductosEnCarrito(): any[] {
    return this.productosEnCarrito;
  }
  agregarAlCarrito(producto: any, cantidad: number) {
    // Buscar si el producto ya existe en el carrito
    const productoExistente = this.productosEnCarrito.find(p => p.id === producto.id);
  
    if (productoExistente) {
      // Si el producto ya existe, actualiza su cantidad
      productoExistente.cantidad += cantidad;
    } else {
      // Si el producto no existe en el carrito, agrégalo
      const productoAgregado = { ...producto, cantidad: cantidad };
      this.productosEnCarrito.push(productoAgregado);
    }
  }
  

  // Vaciar el carrito
  vaciarCarrito() {
    this.productosEnCarrito = [];
  }


  constructor() { }
}
