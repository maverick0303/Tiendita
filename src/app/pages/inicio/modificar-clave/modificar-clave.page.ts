import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/services/producto';
import { BdserviceService } from 'src/app/services/bd.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modificar-clave',
  templateUrl: './modificar-clave.page.html',
  styleUrls: ['./modificar-clave.page.scss'],
})
export class ModificarClavePage implements OnInit {
  arregloProductosResultado: Producto[] = []; // Nueva propiedad
  searchTerm: string = '';

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


  constructor(private router: Router, private bdService: BdserviceService) {}

  ngOnInit() {
    // Subscribo al observable de la BD
    this.bdService.dbState().subscribe(res => {
      if (res) {
        this.bdService.fetchProducto().subscribe(datos => {
          this.arregloProductos = datos;
          this.arregloProductosResultado = datos;
        })
      }
    })
    this.loadProducts();

  }

  loadProducts() {
    // Llama a la función para cargar productos (deberías tener esta función en tu servicio)
    this.bdService.fetchProducto().subscribe((productos) => {
      this.arregloProductos = productos;
    });
  }

  searchProducts() {
    if (this.searchTerm.trim() !== '') {
      // Utiliza la función buscarProductoPorNombre para buscar productos
      this.bdService
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


