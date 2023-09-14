import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editar-p-admin',
  templateUrl: './editar-p-admin.page.html',
  styleUrls: ['./editar-p-admin.page.scss'],
})
export class EditarPAdminPage implements OnInit {
  nombrePValue: string = '';
  descripcionPValue: string = '';
  precioPValue: number = 1;
  imagenPValue: File | undefined;
  categoriaPValue: string = '';
  
  constructor() { }

  ngOnInit() {
  }

  limitarLongitudPrecio(event:any) {
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
