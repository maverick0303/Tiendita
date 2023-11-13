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
  listaDetalle: any;  // Asegúrate de declarar listaDetalle en tu clase

  constructor(private bd: BdserviceService) { }

  ngOnInit() {
    this.bd.listaDetalle.subscribe((detalle) => {
      // Verificar si el carrito está vacío
      this.carritoVacio = detalle.length === 0;
    });

    // Llamar a la función para buscar el carrito (asegúrate de pasar los parámetros correctos)
    this.bd.buscarCarrito(this.idUsuario, "Carrito");
  }
}


