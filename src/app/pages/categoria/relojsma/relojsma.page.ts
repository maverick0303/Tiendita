import { Component, OnInit } from '@angular/core';
import { BdserviceService } from 'src/app/services/bd.service';
@Component({
  selector: 'app-relojsma',
  templateUrl: './relojsma.page.html',
  styleUrls: ['./relojsma.page.scss'],
})
export class RelojsmaPage implements OnInit {

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
      this.bd.mostrarCategoria(5);
      this.bd.fecthMostrarProducto().subscribe(datos => {
        this.ArregloMostrar = datos;
      })
    }
  })
}
}