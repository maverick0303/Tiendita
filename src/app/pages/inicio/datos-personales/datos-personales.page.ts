import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { BdserviceService } from 'src/app/services/bd.service';
import { Producto } from 'src/app/services/producto';

@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.page.html',
  styleUrls: ['./datos-personales.page.scss'],
})
export class DatosPersonalesPage implements OnInit {
  idEnviado: string = '';
  nombreEnviado: string = '';
  apellidoEnviado: string = '';
  emailEnviado: string = '';
  rutEnviado: string = '';
  contrasenaEnviado: string = '';
  idRolEnviado: string = '';
  respuestaEnviada: string = '';
  nombrePreguntaEnviada: string = '';
  idVentaEnviada: string = '';
  fotoUEnviada: string = '';

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


  constructor(private router: Router, private bdService: BdserviceService) { }

  ngOnInit() {
    this.bdService.getUsuarioAutenticadoDesdeBD().then(usuario => {
      if (usuario) {
        this.idEnviado = usuario.idUsuario;
        this.nombreEnviado = usuario.nombreU;
        this.apellidoEnviado = usuario.apellidoU;
        this.emailEnviado = usuario.correoU;
        this.rutEnviado = usuario.rutU;
        this.fotoUEnviada = usuario.fotoU;

      }
    });
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

  async modificar() {
    let usuario = {
      idUsuario: this.idEnviado,
      nombreU: this.nombreEnviado,
      apellidoU: this.apellidoEnviado,
      correoU: this.emailEnviado,
      rutU: this.rutEnviado,
      fotoU: this.fotoUEnviada

    };

    await this.bdService.actualizarUsuario(usuario.idUsuario, usuario.nombreU, usuario.apellidoU, usuario.rutU, usuario.correoU, usuario.fotoU);

    let navigationExtras: NavigationExtras = {
      state: {
        idEnviado: this.idEnviado,
        nombreEnviado: this.nombreEnviado,
        apellidoEnviado: this.apellidoEnviado,
        rutEnviado: this.rutEnviado,
        emailEnviado: this.emailEnviado,
      }
    };

    this.router.navigate(['/m-datos'], navigationExtras);
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === ' ') {
      event.preventDefault();
    }
  }
  get imageData(): any {
    return this.bdService.imageData;
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

