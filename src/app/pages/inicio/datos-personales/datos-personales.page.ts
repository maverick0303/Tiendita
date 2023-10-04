import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { BdserviceService } from 'src/app/services/bd.service';


@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.page.html',
  styleUrls: ['./datos-personales.page.scss'],
})
export class DatosPersonalesPage implements OnInit {
  idEnviado: string = '';
  nombreEnviado: string = '';
  apellidoEnviado: string = '';
  emailEnviado: string = '';
  rutEnviado: string = '';
  contrasenaEnviado: string = '';
  idRolEnviado: string = '';
  respuestaEnviada: string = '';
  nombrePreguntaEnviada: string = '';
  idVentaEnviada: string = '';
  

  constructor(private router: Router,private bdService: BdserviceService) { }

  ngOnInit() {
    this.bdService.getUsuarioAutenticadoDesdeBD().then(usuario => {
      if (usuario) {
        this.idEnviado = usuario.idUsuario;
        this.nombreEnviado = usuario.nombreU;
        this.apellidoEnviado = usuario.apellidoU;
        this.emailEnviado = usuario.correoU;
        this.rutEnviado = usuario.rutU;
        
      }
    });
    
  }

  async modificar() {
    let usuario = {
      idUsuario: this.idEnviado,
      nombreU: this.nombreEnviado,
      apellidoU: this.apellidoEnviado,
      correoU: this.emailEnviado,
      rutU: this.rutEnviado
      
    };
  
    await this.bdService.actualizarUsuario(usuario.idUsuario,usuario.nombreU, usuario.apellidoU, usuario.rutU, usuario.correoU);

    let navigationExtras: NavigationExtras = {
      state: {
        idEnviado: this.idEnviado,
        nombreEnviado: this.nombreEnviado,
        apellidoEnviado: this.apellidoEnviado,
        rutEnviado: this.rutEnviado,
        emailEnviado: this.emailEnviado,
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
