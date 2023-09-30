import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BdserviceService } from 'src/app/services/bd.service';
import { Usuario } from 'src/app/services/usuario';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-lista-usuario',
  templateUrl: './lista-usuario.page.html',
  styleUrls: ['./lista-usuario.page.scss'],
})
export class ListaUsuarioPage implements OnInit {
  usuarios: Usuario[] = [];
  rol = 1;
  constructor(private activeRoute: ActivatedRoute, private router: Router, private bd: BdserviceService) { }



  ngOnInit() {
    this.activeRoute.queryParams.subscribe((param) => {
      this.rol = this.router.getCurrentNavigation()?.extras?.state?.['roles'];
    });
    //lista de usuarios

    this.bd.fetchUsuario().subscribe(usuarios => {
      this.usuarios = usuarios;
    });

    // Obtener el usuario autenticado desde el almacenamiento local
    this.bd.getUsuarioAutenticado().then(usuario => {
      if (usuario) {
        this.rol = parseInt(usuario.idRol, 10);
      }
    });

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


}



