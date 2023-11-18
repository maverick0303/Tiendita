import { Component, OnInit } from '@angular/core';
import { BdserviceService } from 'src/app/services/bd.service';

@Component({
  selector: 'app-carrito2',
  templateUrl: './carrito2.page.html',
  styleUrls: ['./carrito2.page.scss'],
})
export class Carrito2Page implements OnInit {
  rol: number;
  idUsuario = localStorage.getItem("idUsuario");
  carritoVacio: boolean = false;
  listaDetalle: any;
  subtotalTotal: number = 0; // Nueva propiedad para el subtotal total

  constructor(private bd: BdserviceService) {this.rol = parseInt(localStorage.getItem('idRol')!);}

  ngOnInit() {
    this.bd.fetchDetalle().subscribe((detalle) => {
      this.listaDetalle = detalle;
      // Verificar si el carrito está vacío
      this.carritoVacio = detalle.length === 0;
      // Calcular el subtotal total
      this.subtotalTotal = detalle.reduce((total, item) => {
        // Verificar la existencia y tipo de las propiedades
        if (item && typeof item.cantidad === 'number' && typeof item.precio === 'number') {
          return total + item.cantidad * item.precio;
        } else {
          // Manejar el caso en el que las propiedades no sean válidas
          console.error('Error: Propiedades inválidas en el elemento del carrito', item);
          return total;
        }
      }, 0);});

    // Llamar a la función para buscar el carrito (asegúrate de pasar los parámetros correctos)
    this.bd.buscarCarrito(this.idUsuario, "Carrito");
  }

  // Función para finalizar la compra
  finalizarCompra() {
    this.bd.realizarCompra(this.idUsuario); // Asegúrate de tener idUsuario disponible
  }
  vaciarCarrito() {
    this.bd.eliminarProductosDelCarrito().subscribe(() => {
      this.listaDetalle = []; // Vacía la lista de detalles localmente
      this.carritoVacio = true; // Establece que el carrito está vacío
      this.subtotalTotal = 0; // Reinicia el subtotal total
    });
  }
  

}
