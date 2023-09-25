import { Component, OnInit } from '@angular/core';
import { BdserviceService } from 'src/app/services/bd.service';

@Component({
  selector: 'app-audigamer',
  templateUrl: './audigamer.page.html',
  styleUrls: ['./audigamer.page.scss'],
})
export class AudigamerPage implements OnInit {

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

  constructor(private bd: BdserviceService) { }

  ngOnInit() {
   //subscribo al observable de la BD
   this.bd.dbState().subscribe(res => {
    if (res) {
      this.bd.mostrarCategoria(4);
      this.bd.fecthMostrarProducto().subscribe(datos => {
        this.ArregloMostrar = datos;
      })
    }
  })
}
}