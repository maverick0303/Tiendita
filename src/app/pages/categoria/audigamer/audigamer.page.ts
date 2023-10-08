import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { BdserviceService } from 'src/app/services/bd.service';
import { Producto } from 'src/app/services/producto';
@Component({
  selector: 'app-audigamer',
  templateUrl: './audigamer.page.html',
  styleUrls: ['./audigamer.page.scss'],
})
export class AudigamerPage implements OnInit {
  searchTerm: string = '';
  arregloProductosResultado: Producto[] = []; // Nueva propiedad
  ArregloMostrar:  any =[
    {
    idProducto: '',
    nombreProducto:'',
    precio: '',
    foto:'',
    nombreCategoria:'',
    idCategoria: '',
  }
  ]

  constructor(private activedRouter: ActivatedRoute, private router: Router, private bd: BdserviceService) {}

  ngOnInit() {
   //subscribo al observable de la BD
   this.bd.dbState().subscribe(res => {
    if (res) {
      this.bd.mostrarCategoria(4);
      this.bd.fecthMostrarProducto().subscribe(datos => {
        this.ArregloMostrar = datos;
        this.arregloProductosResultado = datos;
      })
    }
  })
}
  loadProducts() {
    // Llama a la función para cargar productos (deberías tener esta función en tu servicio)
    this.bd.fetchProducto().subscribe((productos) => {
      this.ArregloMostrar = productos;
    });
  }

  ver(producto: any){
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
    this.arregloProductosResultado = this.ArregloMostrar;
  }
}

  // Función para verificar si no se encontraron resultados en la búsqueda
  noProductFound(): boolean {
    return this.searchTerm.trim() !== '' && this.arregloProductosResultado.length === 0;
  }
}

