import { Component, OnInit } from '@angular/core';
import { CarritoService } from 'src/app/services/carrito.service';
import { BdserviceService } from 'src/app/services/bd.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {
  rol: number;
  productosEnCarrito: any[] = [];
  cantidad: number = 1;
  
  
   // ARREGLO DE LOS PRODUCTOS
   arregloProductos: any = [
    {
      idProducto: '',
      nombreProducto: '',
      descripcion: '',
      precio: '',
      stock: '',
      nombreCategoria: '',
      foto: ''
    }
  ]

  constructor(private bd: BdserviceService, private carritoService: CarritoService, private toastController: ToastController,private router: Router,) 
  {this.rol = parseInt(localStorage.getItem('idRol')!);
  {
    this.rol = parseInt(localStorage.getItem('idRol')!);
    if (this.rol !== 1 && this.rol !== 2) {
      this.router.navigate(['/tienda']);
      setTimeout(() => {
        alert('Debe iniciar sesión para acceder a esta página.');
      }, 1); }
    }
   }


  ngOnInit() {
    this.productosEnCarrito = this.carritoService.getProductosEnCarrito();
    this.cantidad = this.carritoService.getCantidad();
     // Subscribo al observable de la BD
     this.bd.dbState().subscribe(res => {
      if (res) {
        this.bd.fetchProducto().subscribe(datos => {
          this.arregloProductos = datos;
        })
        
      }
    })
  }

  async mostrarMensajeCompraFinalizada() {
    const toast = await this.toastController.create({
      message: '¡Compra finalizada!',
      duration: 2000, // Duración del mensaje en milisegundos
      position: 'middle', // Posición del mensaje en la parte superior
      color: 'success' // Color del mensaje (puedes personalizarlo)
    });
    toast.present();
  }
  
  async mostrarMensajeCarritoVacio() {
    const toast = await this.toastController.create({
      message: 'El carrito está vacío. Agregue productos antes de finalizar la compra.',
      duration: 3000, // Duración del mensaje en milisegundos
      position: 'middle', // Posición del mensaje en la parte superior
      color: 'warning' // Color del mensaje (puedes personalizarlo)
    });
    toast.present();
  }
}




  

