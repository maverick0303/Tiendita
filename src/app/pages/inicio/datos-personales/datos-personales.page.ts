import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.page.html',
  styleUrls: ['./datos-personales.page.scss'],
})
export class DatosPersonalesPage implements OnInit {
  nombreValue: string = 'Maria ';
  apellidoValue: string = 'Yeguez';
  segPersonaValue: string = 'Ernesto Pino';
  correo: string = '';  // Variable para almacenar el correo

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params: any) => {
      this.correo = params['correo'];  // Obtener el correo electrónico
    });
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === ' ') {
      event.preventDefault(); // Evita que la barra espaciadora sea escrita en el campo
    }
  }

}
