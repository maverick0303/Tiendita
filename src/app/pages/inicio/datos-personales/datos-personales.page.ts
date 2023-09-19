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
  emailEnviado: string = '';  
  rutEnviado: string = '';
  passwordEnviado: string = '';
  segPersonaValue: string = '';

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    // Access the state property directly
    this.route.paramMap.subscribe(params => {
      const state = window.history.state;
      this.nombreEnviado = state.nombreEnviado;
      this.apellidoEnviado = state.apellidoEnviado;
      this.rutEnviado = state.rutEnviado;
      this.emailEnviado = state.emailEnviado;
      this.passwordEnviado = state.passwordEnviado;
    });
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === ' ') {
      event.preventDefault(); 
    }
  }
}
