import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BdserviceService } from 'src/app/services/bd.service';

@Component({
  selector: 'app-ag3',
  templateUrl: './ag3.page.html',
  styleUrls: ['./ag3.page.scss'],
})
export class Ag3Page implements OnInit {
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
   //subscribo al observable de la BD
    this.bd.dbState().subscribe(res => {
      if (res) {
        this.bd.fetchProducto().subscribe(datos => {
          this.arregloProductos = datos;
        })
      }
    })
  }
}