import { Component, OnInit } from '@angular/core';
import { BdserviceService } from 'src/app/services/bd.service';

@Component({
  selector: 'app-carrito2',
  templateUrl: './carrito2.page.html',
  styleUrls: ['./carrito2.page.scss'],
})
export class Carrito2Page implements OnInit {
  idUsuario = localStorage.getItem("idUsuario");
  carritoVacio: boolean = false;
  listaDetalle: any;  

  constructor(private bd: BdserviceService) { }

  ngOnInit() {
    this.bd.fetchDetalle().subscribe((detalle) => {
      this.listaDetalle = detalle;
      // Verificar si el carrito está vacío
      this.carritoVacio = detalle.length === 0;
    });

    // Llamar a la función para buscar el carrito (asegúrate de pasar los parámetros correctos)
    this.bd.buscarCarrito(this.idUsuario, "Carrito");
  }

  finalizarCompra() {
    this.bd.finalizarCompra();
  }

  vaciarCarrito() {
    this.listaDetalle = [];
  }

  vaciarProductoDelCarrito(idProducto: any) {
    // Llama a la función para eliminar solo un producto del carrito
    this.bd.eliminarProductoDelCarrito(idProducto).subscribe(() => {
      // Actualiza la lista de detalles después de eliminar el producto
      this.bd.fetchDetalle().subscribe((detalle) => {
        this.listaDetalle = detalle;
        this.carritoVacio = detalle.length === 0;
      });
    });
  }
}




