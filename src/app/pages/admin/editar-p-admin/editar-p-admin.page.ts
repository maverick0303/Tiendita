import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editar-p-admin',
  templateUrl: './editar-p-admin.page.html',
  styleUrls: ['./editar-p-admin.page.scss'],
})
export class EditarPAdminPage implements OnInit {
  nombrePValue: string = '';
  descripcionPValue: string = '';
  precioPValue: number = 0;
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

  validarNumeros(event: Event) {
    const input = event.target as HTMLInputElement;
    const regex = /^[0-9]*$/;

    if (!regex.test(input.value)) {
      input.value = input.value.replace(/[^0-9]/g, '');
      this.precioPValue = +input.value; // Convierte a número
    }
  }
}
