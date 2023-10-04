import { Component, OnInit } from '@angular/core';
import { CarritoService } from 'src/app/services/carrito.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {
  productosEnCarrito: any[] = [];
  cantidad: number = 1;

  constructor(private carritoService: CarritoService) { }

  ngOnInit() {
    this.productosEnCarrito = this.carritoService.getProductosEnCarrito();
    this.cantidad = this.carritoService.getCantidad();
  }

  calcularTotal(): number {
    let total = 0;
    for (const producto of this.productosEnCarrito) {
      total += producto.precioTotal; // Debes sumar el precioTotal en lugar del precio
    }
    return total;
  }

  vaciarCarrito() {
    this.carritoService.vaciarCarrito();
    this.productosEnCarrito = [];
    this.cantidad = 1; // Restablece la cantidad a 1 al vaciar el carrito
  }

  aumentarCantidad(producto: any) {
    if (producto.stock > this.cantidad) {
      // Si hay suficiente stock, aumenta la cantidad en el carrito
      this.cantidad++;
  
      // Actualiza el precio total del producto
      producto.precioTotal = producto.precio * this.cantidad;
  
      // Actualiza la cantidad en el servicio
      this.carritoService.setCantidad(this.cantidad);
    } else {
      // Muestra un mensaje de que no hay suficiente stock
      console.log('No hay suficiente stock disponible.');
    }
  }

  disminuirCantidad(producto: any) {
    if (this.cantidad > 1) {
      // Disminuye la cantidad en el carrito si no es menor que 1
      this.cantidad--;
  
      // Actualiza el precio total del producto
      producto.precioTotal = producto.precio * this.cantidad;
  
      // Actualiza la cantidad en el servicio
      this.carritoService.setCantidad(this.cantidad);
    } else if (this.cantidad === 1) {
      // Si la cantidad es 1, elimina el producto del carrito
      this.eliminarProducto(producto);
    }
  }
  
  eliminarProducto(producto: any) {
    // Elimina el producto del carrito
    const index = this.productosEnCarrito.indexOf(producto);
    if (index > -1) {
      this.productosEnCarrito.splice(index, 1);
      // Actualiza la cantidad en el servicio después de eliminar un producto
      this.carritoService.setCantidad(this.cantidad);
    }
  }  
  
  agregarAlCarrito(producto: any) {
    const cantidadSeleccionada = this.cantidad;
    
    // Verificar si el producto ya está en el carrito
    const productoExistente = this.productosEnCarrito.find(p => p.id === producto.id);
  
    if (productoExistente) {
      // Si el producto ya existe en el carrito, actualiza su cantidad
      productoExistente.cantidad += cantidadSeleccionada;
    } else {
      // Si el producto no existe en el carrito, agrégalo
      this.carritoService.agregarAlCarrito(producto, cantidadSeleccionada);
    }
  
    // Restablece la cantidad a 1 después de agregar al carrito
    this.cantidad = 1;
  
    // Actualiza la cantidad en el servicio
    this.carritoService.setCantidad(this.cantidad);
  }
  
}
