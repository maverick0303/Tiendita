import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-datos-personales', 
  templateUrl: './datos-personales.page.html',
  styleUrls: ['./datos-personales.page.scss'],
})
export class DatosPersonalesPage implements OnInit {
  nombreEnviado: string = '';
  apellidoEnviado: string = '';
  correoEnviado: string = '';  
  rutEnviado: string = '';
  segPersonaValue: string = '';

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    // Access the state property directly
    this.route.paramMap.subscribe(params => {
      const state = window.history.state;
      this.nombreEnviado = state.nombreEnviado;
      this.apellidoEnviado = state.apellidoEnviado;
      this.rutEnviado = state.rutEnviado;
      this.correoEnviado = state.correoEnviado;
    });
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === ' ') {
      event.preventDefault(); 
    }
  }
}
