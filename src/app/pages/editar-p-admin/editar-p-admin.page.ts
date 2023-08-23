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
  constructor() { }

  ngOnInit() {
  }

}
