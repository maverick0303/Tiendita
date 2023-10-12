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
  rol: number;
  idEnviado: string = '';
  nombreEnviado: string = '';
  apellidoEnviado: string = '';
  emailEnviado: string = '';
  rutEnviado: string = '';
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


  constructor(private router: Router, private bdService: BdserviceService) {
    this.idEnviado = localStorage.getItem('idUsuario')!;
    this.nombreEnviado = localStorage.getItem('nombreU')!;
    this.apellidoEnviado = localStorage.getItem('apellidoU')!;
    this.rutEnviado = localStorage.getItem('rutU')!;
    this.emailEnviado = localStorage.getItem('correoU')!;
    this.fotoUEnviada = localStorage.getItem('fotoU')!;
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
        fotoUEnviada: this.fotoUEnviada
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

