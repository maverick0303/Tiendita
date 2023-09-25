import { Component, OnInit } from '@angular/core';
import { BdserviceService } from 'src/app/services/bd.service';
@Component({
  selector: 'app-reloj-ana',
  templateUrl: './reloj-ana.page.html',
  styleUrls: ['./reloj-ana.page.scss'],
})
export class RelojAnaPage implements OnInit {
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
      this.bd.mostrarCategoria(2);
      this.bd.fecthMostrarProducto().subscribe(datos => {
        this.ArregloMostrar = datos;
      })
    }
  })
}
}