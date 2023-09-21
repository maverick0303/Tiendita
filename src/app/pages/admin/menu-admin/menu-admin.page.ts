import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { BdserviceService } from 'src/app/services/bd.service';

@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.page.html',
  styleUrls: ['./menu-admin.page.scss'],
})
export class MenuAdminPage implements OnInit {
  arregloProducto: any = [
    {
      
        idProducto: '',
        nombreProducto: '',
        descripcion: '',
        precio: '',
        stock: '',
        foto: ''
    }

  ]

  constructor(private bd: BdserviceService, private router: Router) { }

  ngOnInit() {
    //subscribo al observable de la BD
    this.bd.dbState().subscribe(res=>{
      if(res){
        this.bd.fetchProducto().subscribe(datos=>{
          this.arregloProducto = datos;
        })
      }
    })

  }

  

}
