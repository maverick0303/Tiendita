import { Component, OnInit } from '@angular/core';
import { BdserviceService } from 'src/app/services/bd.service';
@Component({
  selector: 'app-audiina',
  templateUrl: './audiina.page.html',
  styleUrls: ['./audiina.page.scss'],
})
export class AudiinaPage implements OnInit {
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
      this.bd.mostrarCategoria(3);
      this.bd.fecthMostrarProducto().subscribe(datos => {
        this.ArregloMostrar = datos;
      })
    }
  })
}
}