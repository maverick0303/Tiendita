import { Component, OnInit } from '@angular/core';
import { CarritoService } from 'src/app/services/carrito.service';
import { BdserviceService } from 'src/app/services/bd.service';
import { ToastController } from '@ionic/angular';
import { Producto } from 'src/app/services/producto';
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
  searchTerm: string = '';
  arregloProductosResultado: Producto[] = []; // Nueva propiedad
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
          this.arregloProductosResultado = datos;
        })
      }
    })
    this.loadProducts();
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

  recopilarDatosCompra(): any {
    const productosEnCarrito = this.carritoService.getProductosEnCarrito();
    const totalVenta = this.calcularTotal();
    const idUsuarioVenta = 1; // Cambia el ID del usuario según sea necesario
  
    return {
      productosEnCarrito,
      totalVenta,
      idUsuarioVenta
    };
  }

  finalizarCompra() {
    const { productosEnCarrito, totalVenta, idUsuarioVenta } = this.recopilarDatosCompra();
  
    // Verifica si hay productos en el carrito antes de finalizar la compra
    if (productosEnCarrito.length === 0) {
      // Muestra un mensaje de que el carrito está vacío y no se puede finalizar la compra
      this.mostrarMensajeCarritoVacio();
      return; // Sal de la función
    }
  
    // Inserta la venta en la base de datos
    this.bd.insertarVenta(totalVenta, JSON.stringify(productosEnCarrito), idUsuarioVenta)
      .then((res) => {
        // Muestra un mensaje de compra finalizada.
        this.mostrarMensajeCompraFinalizada();
  
        // Luego de insertar la venta, puedes redirigir al usuario
        // a la página de confirmación o agradecimiento.
  
        // Insertar detalles en la tabla "detalle"
        res.insertId; // Este es el ID de la venta recién insertada
  
        for (const producto of productosEnCarrito) {
          // Aquí debes calcular subtotalD basado en el precio del producto y la cantidad
          const subtotalD = producto.precio * producto.cantidad;
  
          // Llama a la función para insertar un detalle
          this.bd.insertarDetalle(producto.cantidad, subtotalD, producto.id, res.insertId)
            .then(() => {
              console.log('Detalle insertado');
            })
            .catch(error => {
              console.error('Error al insertar detalle: ', error);
            });
        }
  
        // Finalmente, puedes vaciar el carrito si es necesario.
        this.carritoService.vaciarCarrito();
  
        // Redirigir al usuario a la página de confirmación o agradecimiento
        // utilizando el enrutador de Angular (router).
        // Ejemplo:
        this.router.navigate(['/tienda']);
      })
      .catch(error => {
        console.error('Error al insertar venta: ', error);
      });
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
  loadProducts() {
    // Llama a la función para cargar productos (deberías tener esta función en tu servicio)
    this.bd.fetchProducto().subscribe((productos) => {
      this.arregloProductos = productos;
    });
  }

  searchProducts() {
    if (this.searchTerm.trim() !== '') {
      // Utiliza la función buscarProductoPorNombre para buscar productos
      this.bd
        .buscarProductoPorNombre(this.searchTerm.trim())
        .then((productos) => {
          this.arregloProductosResultado = productos;

          // Redirige al usuario a la página de la tienda con el término de búsqueda como parámetro de consulta
          this.router.navigate(['/tienda'], {
            queryParams: { searchTerm: this.searchTerm.trim() }
          });
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    } else {
      // Si el término de búsqueda está vacío, muestra todos los productos
      this.arregloProductosResultado = this.arregloProductos;
    }
  }
}





  

