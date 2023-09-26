import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { BdserviceService } from 'src/app/services/bd.service';

@Component({
  selector: 'app-lista-registros',
  templateUrl: './listaregistros.page.html',
  styleUrls: ['./listaregistros.page.scss'],
})
export class ListaRegistrosPage implements OnInit {

  arregloUsuario: any = [
    {
      idUsuario: '',
      nombreU: '',
      apellidoU: '',
      rutU: '',
      correoU: '',
      claveU: '',
      idRol: '',
      respuesta: '',
      nombrePregunta: '',
      idVenta: ''
    }
  ];

  constructor(private bd: BdserviceService, private router: Router) { }

  ngOnInit() {
    // Consultar la lista de usuarios desde la base de datos
    this.bd.dbState().subscribe(res => {
      if (res) {
        this.bd.fetchUsuario().subscribe(datos => {
          console.log(this.arregloUsuario);
          this.arregloUsuario = datos;
        });
      }
    });
  }

  modificar(x:any){
    let navigationExtras: NavigationExtras = {
      state: {
        idEnviado: x.id,
        nombreEnviado: x.nombre,
        apellidoEnviado: x.apellido
      }
    }
    this.router.navigate(['/modificar'],navigationExtras);
  }

  eliminar(x:any){
    this.bd.eliminarUsuario(x.id);
    this.bd.presentAlert("Usuario Eliminado");

  }

}

