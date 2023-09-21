import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { BdserviceService } from 'src/app/services/bd.service';

@Component({
  selector: 'app-agregar-p-admin',
  templateUrl: './agregar-p-admin.page.html',
  styleUrls: ['./agregar-p-admin.page.scss'],
})
export class AgregarPAdminPage implements OnInit {
  nombrePValue: string = '';
  descripcionPValue: string = '';
  precioPValue: number = 1;
  stockPValue: number = 1;
  imagenPValue: File | undefined;
  categoriaPValue: string = '';

  constructor(private router:Router, private db: BdserviceService) { }
  
  InjectSetupWrapper(){
    this.db.insertarProducto(this.nombrePValue,this.descripcionPValue,this.precioPValue,this.stockPValue,this.imagenPValue)
  }

  ngOnInit() {
  }

  limitarLongitudPrecio(event: any) {
    const maxLength = 10;
    if (event.target.value.length > maxLength) {
      event.target.value = event.target.value.slice(0, maxLength);
      this.precioPValue = parseInt(event.target.value, 10);
    }
  } 
  
  validatePrecio(precioValue: number) {
    const firstDigit = String(precioValue).charAt(0);
  
    if (firstDigit === '0') {
      this.precioPValue = 1;
    }
    if (firstDigit === '-') {
      this.precioPValue = 1;
    }
  }
}
