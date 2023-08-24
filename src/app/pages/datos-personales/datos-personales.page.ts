import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.page.html',
  styleUrls: ['./datos-personales.page.scss'],
})
export class DatosPersonalesPage implements OnInit {
  segPersonaValue: string = '';

  constructor() { }

  ngOnInit() {
  }
  onKeyDown(event: KeyboardEvent) {
    if (event.key === ' ') {
      event.preventDefault(); // Evita que la barra espaciadora sea escrita en el campo
    }
  }

}
