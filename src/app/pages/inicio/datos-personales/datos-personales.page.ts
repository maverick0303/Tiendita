import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { BdserviceService } from 'src/app/services/bd.service';


@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.page.html',
  styleUrls: ['./datos-personales.page.scss'],
})
export class DatosPersonalesPage implements OnInit {
  idUsuario: string = '';
  nombreEnviado: string = '';
  apellidoEnviado: string = '';
  rutEnviado: string = '';
  emailEnviado: string = '';
  contrasenaEnviado: string = '';
  idRolEnviado: string = '';
  respuestaEnviada: string = '';
  nombrePreguntaEnviada: string = '';
  idVentaEnviada: string = '';

  constructor(private router: Router,private bdService: BdserviceService) { }

  ngOnInit() {
    this.bdService.getUsuarioAutenticadoDesdeBD().then(usuario => {
      if (usuario) {
        this.idUsuario = usuario.idUsuario;
        this.nombreEnviado = usuario.nombreU;
        this.apellidoEnviado = usuario.apellidoU;
        this.emailEnviado = usuario.correoU;
        this.rutEnviado = usuario.rutU;
      }
    });
  }
  modificar(usuario: any) {
    let navigationExtras: NavigationExtras = {
      state: {
        idEnviado: usuario.idUsuario,
        nombreEnviado: usuario.nombreEnviado,
        apellidoEnviado: usuario.apellidoEnviado,
        rutEnviado: usuario.rutEnviado,
        emailEnviado: usuario.emailEnviado,
        contrasenaEnviada: usuario.contrasenaEnviada,
        idRolEnviado: usuario.idRolEnviado,
        respuestaEnviada: usuario.respuestaEnviada,
        nombrePreguntaEnviada: usuario.nombrePreguntaEnviada,
        idVentaEnviada: usuario.idVentaEnviada
      }
    };
    this.router.navigate(['/m-datos'], navigationExtras);
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
