import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BdserviceService } from 'src/app/services/bd.service';


@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.page.html',
  styleUrls: ['./tienda.page.scss'],
})
export class TiendaPage implements OnInit {
  rol: number = 0;
  //esto es de las pipes:
  dinero = 50000;
  dinero2 = 75000;
  dinero3 = 35000;
  dinero4 = 39990;
  dinero5 = 42000;
  dinero6 = 269000;
  dinero7 = 119000;
  dinero8 = 194990;
  dinero9 = 289000;
  dinero10 = 61990;
  dinero11 = 54000;
  dinero12 = 194550;
  dinero13 = 139000;
  dinero14 = 240000;
  dinero15 = 360000;
  //
  arregloProductos: any = [
    {
      idProducto: '',
      nombreProducto: '',
      descripcion: '',
      precioProducto: '',
      stockPropducto: '',
      nombreCategoria: ''
    }
  ]
  constructor(private activeRoute: ActivatedRoute, private router: Router, private bd: BdserviceService) {

  }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe((param) => {
      this.rol = this.router.getCurrentNavigation()?.extras?.state?.['roles'];
    });
  
    //subscribo al observable de la BD
    this.bd.dbState().subscribe(res=>{
      if(res){
        this.bd.fetchProducto().subscribe(datos=>{
          this.arregloProductos = datos;
        })
      }
    })

  }
}



