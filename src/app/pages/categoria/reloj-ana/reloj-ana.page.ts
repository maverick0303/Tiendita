import { Component, OnInit } from '@angular/core';
import { BdserviceService } from 'src/app/services/bd.service';
import { Producto } from 'src/app/services/producto';
@Component({
  selector: 'app-reloj-ana',
  templateUrl: './reloj-ana.page.html',
  styleUrls: ['./reloj-ana.page.scss'],
})
export class RelojAnaPage implements OnInit {
  searchTerm: string = '';
  arregloProductosResultado: Producto[] = []; // Nueva propiedad
  ArregloMostrar: any = [
    {
      idProducto: '',
      nombreProducto: '',
      precio: '',
      foto: '',
      nombreCategoria: '',
      idCategoria: '',
    }
  ]

  constructor(private bd: BdserviceService) { }

  ngOnInit() {
    //subscribo al observable de la BD
    this.bd.dbState().subscribe(res => {
      if (res) {
        this.bd.mostrarCategoria(2);
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
