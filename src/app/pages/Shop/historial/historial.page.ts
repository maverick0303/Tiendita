import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BdserviceService } from 'src/app/services/bd.service';
import { Producto } from 'src/app/services/producto';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {
  searchTerm: string = '';
  arregloProductosResultado: any[] = [];
  ventasConDetalles: any[] = [];


  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private bd: BdserviceService
  ) { }

  ngOnInit() {
    // Subscribo al observable de la BD
    this.bd.dbState().subscribe((res) => {
      if (res) {
        this.obtenerDatosVentas(); // Llama a la función para obtener datos de ventas
      }
    });
    this.loadProducts();
  }

  loadProducts() {
    // Llama a la función para cargar productos (deberías tener esta función en tu servicio)
    this.bd.fetchProducto().subscribe((productos) => {
      this.arregloProductosResultado = productos;
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
            queryParams: { searchTerm: this.searchTerm.trim() },
          });
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    } else {
      // Si el término de búsqueda está vacío, muestra todos los productos
      this.loadProducts();
    }
  }

  obtenerDatosVentas() {
    // Llama a tu función para obtener datos de ventas desde el servicio
    this.bd.obtenerDatosVentas().then((ventas) => {
      // Aquí tienes los datos de ventas (tabla "venta")
      this.arregloProductosResultado = ventas;
      
      // Llama a la función para obtener datos de ventas con detalles (tabla "detalle")
      this.bd.getVentasConDetalles().then((ventasConDetalles) => {
        // Combina los resultados de ambas consultas
        this.arregloProductosResultado = this.arregloProductosResultado.concat(ventasConDetalles);
      });
    });
  }
}  