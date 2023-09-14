import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agregar-p-admin',
  templateUrl: './agregar-p-admin.page.html',
  styleUrls: ['./agregar-p-admin.page.scss'],
})
export class AgregarPAdminPage implements OnInit {
  nombrePValue: string = '';
  descripcionPValue: string = '';
  precioPValue: number = 1;
  imagenPValue: File | undefined;
  categoriaPValue: string = '';

  constructor() { }

  ngOnInit() {
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
