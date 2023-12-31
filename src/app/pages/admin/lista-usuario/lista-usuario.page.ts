import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BdserviceService } from 'src/app/services/bd.service';
import { Usuario } from 'src/app/services/usuario';
import { FormsModule } from '@angular/forms';
import { Producto } from 'src/app/services/producto';


@Component({
  selector: 'app-lista-usuario',
  templateUrl: './lista-usuario.page.html',
  styleUrls: ['./lista-usuario.page.scss'],
})
export class ListaUsuarioPage implements OnInit {

  usuarios: any;
  rol = 1;
  constructor(private activeRoute: ActivatedRoute, private router: Router, private bd: BdserviceService) { }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe((param) => {
      this.rol = this.router.getCurrentNavigation()?.extras?.state?.['roles'];
    });
    //lista de usuarios

    this.bd.fetchUsuario().subscribe(data => {
      this.usuarios = data;
    });

    // Obtener el usuario autenticado desde el almacenamiento local
    this.bd.getUsuarioAutenticado().then(usuario => {
      if (usuario) {
        this.rol = parseInt(usuario.idRol, 10);
      }
    });

    //funcion de eliminar al usuario

    // Suscribirse al estado de la BD

    //subscribo al observable de la BD
    this.bd.dbState().subscribe(res => {
      if (res) {
        this.bd.fetchUsuario().subscribe(datos => {
          this.usuarios = datos;
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

  eliminarUsuario(x: any) {
    this.bd.eliminarUsuario(x.idUsuario);
    this.bd.presentAlert("Usuario eliminado"); 
  };

  cambiarRol() {
    this.rol = (this.rol === 1) ? 2 : 1;
    this.rol = (this.rol === 2) ? 1 : 2;
    this.bd.actualizarRol(this.usuarios.id, this.rol)
      .then(() => {
        this.bd.presentAlert("Rol cambiado")
      })
      .catch(error => {
        this.bd.presentAlert("El rol no ha podido ser cambiado")
      });
  } 
}