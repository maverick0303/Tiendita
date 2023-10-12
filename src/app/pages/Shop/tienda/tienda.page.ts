import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BdserviceService } from 'src/app/services/bd.service';
import { NavigationExtras, Router } from '@angular/router';
import { CarritoService } from 'src/app/services/carrito.service';
import { Producto } from 'src/app/services/producto';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.page.html',
  styleUrls: ['./tienda.page.scss'],
})
export class TiendaPage implements OnInit {
  rol: number;
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

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private bd: BdserviceService,
    private carritoService: CarritoService
  ) {
    this.rol = parseInt(localStorage.getItem('idRol')!);
  }

  ngOnInit() {
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

  

  modificar(producto: any) {
    let navigationExtras: NavigationExtras = {
      state: {
        idEnviado: producto.idProducto,
        nombreEnviado: producto.nombreProducto,
        descripcionEnviado: producto.descripcion,
        precioEnviado: producto.precio,
        stockEnviado: producto.stock,
        fotoEnviado: producto.foto,
        nombreCategoriaEnviado: producto.nombreCategoria,
      }
    };
    this.router.navigate(['/editar-p-admin'], navigationExtras);
  }

  detalle(producto: any){
    let navigationExtras: NavigationExtras = {
      state: {
        idEnviado: producto.idProducto,
        nombreEnviado: producto.nombreProducto,
        descripcionEnviado: producto.descripcion,
        precioEnviado: producto.precio,
        stockEnviado: producto.stock,
        fotoEnviado: producto.foto,
        nombreCategoriaEnviado: producto.nombreCategoria,
      }
    };
    this.router.navigate(['/ag3'], navigationExtras);
  }

  agregarAlCarrito(producto: any) {
    this.carritoService.agregarProducto(producto);
    this.bd.carritoBien("Producto agregado al carrito");
  }

  eliminar(producto: any) {
    this.bd.eliminarProducto(producto.idProducto);
    this.bd.carritoMal("Producto Eliminado");
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
        console.log('Resultados de búsqueda:', productos); // Agregar esta línea para depuración
        this.arregloProductosResultado = productos;
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  } else {
    // Si el término de búsqueda está vacío, muestra todos los productos
    this.arregloProductosResultado = this.arregloProductos;
  }
}

  // Función para verificar si no se encontraron resultados en la búsqueda
  noProductFound(): boolean {
    return this.searchTerm.trim() !== '' && this.arregloProductosResultado.length === 0;
  }

  
}
