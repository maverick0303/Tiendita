import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BdserviceService } from 'src/app/services/bd.service';
import { Usuario } from 'src/app/services/usuario';


@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.page.html',
  styleUrls: ['./tienda.page.scss'],
})
export class TiendaPage implements OnInit {
  rol: number = 0;

  usuarios: Usuario[] = [];
  mostrarUsuarios: boolean = false;

  mostrarListaUsuarios() {
    this.mostrarUsuarios = true;
  }


  //
  //ARREGLO DE LOS PRODUCTOS
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

  constructor(private activeRoute: ActivatedRoute, private router: Router, private bd: BdserviceService) {

  }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe((param) => {
      this.rol = this.router.getCurrentNavigation()?.extras?.state?.['roles'];
    });
    //subscribo al observable de la BD
    this.bd.dbState().subscribe(res => {
      if (res) {
        this.bd.fetchProducto().subscribe(datos => {
          this.arregloProductos = datos;
        })
      }
    })
    this.activeRoute.queryParams.subscribe((param) => {
      this.rol = this.router.getCurrentNavigation()?.extras?.state?.['roles'];
    });

    // Obtener el usuario autenticado desde el almacenamiento local
    this.bd.getUsuarioAutenticado().then(usuario => {
      if (usuario) {
        this.rol = parseInt(usuario.idRol, 10); // Convertir a número entero
      }
    });
  }


}


