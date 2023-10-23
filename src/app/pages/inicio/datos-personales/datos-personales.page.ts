import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { BdserviceService } from 'src/app/services/bd.service';


@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.page.html',
  styleUrls: ['./datos-personales.page.scss'],
})
export class DatosPersonalesPage implements OnInit {
  rol: number;
  idEnviado: string = '';
  nombreEnviado: string = '';
  apellidoEnviado: string = '';
  emailEnviado: string = '';
  rutEnviado: string = '';
  fotoUEnviada: string = '';

  constructor(private router: Router, private bd: BdserviceService) {
    this.idEnviado = localStorage.getItem('idUsuario')!;
    this.nombreEnviado = localStorage.getItem('nombreU')!;
    this.apellidoEnviado = localStorage.getItem('apellidoU')!;
    this.rutEnviado = localStorage.getItem('rutU')!;
    this.emailEnviado = localStorage.getItem('correoU')!;
    this.fotoUEnviada = localStorage.getItem('fotoU')!;
    {
      this.rol = parseInt(localStorage.getItem('idRol')!);
      if (this.rol !== 1 && this.rol !== 2) {
        this.router.navigate(['/tienda']);
        setTimeout(() => {
          alert('Debe iniciar sesión para acceder a esta página.');
        }, 1); }
      }
  }

  ngOnInit() {
    this.bd.getUsuarioAutenticadoDesdeBD(this.idEnviado).then(usuario => {
      if (usuario) {
        this.idEnviado = usuario.idUsuario;
        this.nombreEnviado = usuario.nombreU;
        this.apellidoEnviado = usuario.apellidoU;
        this.emailEnviado = usuario.correoU;
        this.rutEnviado = usuario.rutU;
        this.fotoUEnviada = usuario.fotoU;
      }
    });
  }

  async modificar() {
    let usuario = {
      idUsuario: this.idEnviado,
      nombreU: this.nombreEnviado,
      apellidoU: this.apellidoEnviado,
      correoU: this.emailEnviado,
      rutU: this.rutEnviado,
      fotoU: this.fotoUEnviada
    };

    let navigationExtras: NavigationExtras = {
      state: {
        idEnviado: this.idEnviado,
        nombreEnviado: this.nombreEnviado,
        apellidoEnviado: this.apellidoEnviado,
        rutEnviado: this.rutEnviado,
        emailEnviado: this.emailEnviado,
        fotoUEnviada: this.fotoUEnviada
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
    return this.bd.imageData;
  }
}