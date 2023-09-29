import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BdserviceService } from 'src/app/services/bd.service';


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

  constructor(private route: ActivatedRoute,private bdService: BdserviceService) { }

  ngOnInit() {
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === ' ') {
      event.preventDefault();
    }
  }
  get imageData(): any {
    return this.bdService.imageData;
  }

  
}
