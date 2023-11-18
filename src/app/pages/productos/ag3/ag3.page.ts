import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BdserviceService } from 'src/app/services/bd.service';
import { Producto } from 'src/app/services/producto';
import { CarritoService } from 'src/app/services/carrito.service';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-ag3',
  templateUrl: './ag3.page.html',
  styleUrls: ['./ag3.page.scss'],
})
export class Ag3Page implements OnInit {
  idRol: number;
  searchTerm: string = '';
  arregloProductosResultado: Producto[] = []; // Nueva propiedad
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


  idProducto = "";
  image2: any;
  nombrePValue: string = '';
  descripcionPValue: string = '';
  precioPValue: number = 1;
  stockPValue: number = 1;
  imagenPValue: any;
  categoriaPValue: string = '';

  constructor(private toastController: ToastController, private activedRouter: ActivatedRoute, private router: Router, private bd: BdserviceService, private carritoService: CarritoService) {
    this.idRol = parseInt(localStorage.getItem('idRol')!);
    this.activedRouter.queryParams.subscribe(res => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.idProducto = this.router.getCurrentNavigation()?.extras?.state?.['idEnviado']
        this.nombrePValue = this.router.getCurrentNavigation()?.extras?.state?.['nombreEnviado'];
        this.descripcionPValue = this.router.getCurrentNavigation()?.extras?.state?.['descripcionEnviado'];
        this.precioPValue = this.router.getCurrentNavigation()?.extras?.state?.['precioEnviado'];
        this.stockPValue = this.router.getCurrentNavigation()?.extras?.state?.['stockEnviado'];
        this.imagenPValue = this.router.getCurrentNavigation()?.extras?.state?.['fotoEnviado'];
        this.categoriaPValue = this.router.getCurrentNavigation()?.extras?.state?.['nombreCategoriaEnviado'];
      }
    })
  }

  ngOnInit() {
    //subscribo al observable de la BD
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

  // En tu componente Ag3Page
  agregarAlCarrito() {
    this.mostrarMensaje("Producto agregado :D ")
    this.bd.agregarAlCarrito2(this.idProducto, 1)
      .catch(error => {
        this.mostrarMensaje('Error al agregar al carrito:');
      });
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

  async mostrarMensaje(mensaje: string): Promise<void> {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000, // Duración en milisegundos
      position: 'middle', // Posición en la pantalla
      color: 'tertiary'
    });
    await toast.present();
  }
}

