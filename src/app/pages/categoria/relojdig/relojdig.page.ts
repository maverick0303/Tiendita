import { Component, OnInit } from '@angular/core';
import { BdserviceService } from 'src/app/services/bd.service';

@Component({
  selector: 'app-relojdig',
  templateUrl: './relojdig.page.html',
  styleUrls: ['./relojdig.page.scss'],
})
export class RelojdigPage implements OnInit {

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
      this.bd.mostrarCategoria(1);
      this.bd.fecthMostrarProducto().subscribe(datos => {
        this.ArregloMostrar = datos;
      })
    }
  })
}
}