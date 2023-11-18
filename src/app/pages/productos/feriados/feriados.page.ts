import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from 'src/app/services/apiservice.service';

@Component({
  selector: 'app-feriados',
  templateUrl: './feriados.page.html',
  styleUrls: ['./feriados.page.scss'],
})
export class FeriadosPage implements OnInit {
  holidays: any;

  constructor(private apiService: ApiserviceService) { }

  ngOnInit() {
    this.obtenerDatos();
  }

  obtenerDatos() {
    this.apiService.obtenerFeriados().subscribe(
      (data) => {
        this.holidays = data;
        console.log(this.holidays);
      },
      (error) => {
        console.error('Error al obtener datos de feriados', error);
      }
    );
  }
}

