import { Component, ElementRef, ViewChildren } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FormControl, Validators } from '@angular/forms';
import { AnimationController } from '@ionic/angular';
import { QueryList } from '@angular/core';
import { Animation } from '@ionic/angular';
import { IonCard } from '@ionic/angular';
import { BdserviceService } from 'src/app/services/bd.service';
import { Usuario } from 'src/app/services/usuario';


@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.page.html',
  styleUrls: ['./inicio-sesion.page.scss'],
})
export class InicioSesionPage {
  rol: number = 0;
  correo: string = '';
  contrasena: string = '';
  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);

  @ViewChildren(IonCard, { read: ElementRef }) cardElements!: QueryList<ElementRef<HTMLIonCardElement>>;
  private animation: Animation | null = null;

  constructor(private router: Router, private toastController: ToastController, private animationCtrl: AnimationController, private bdService: BdserviceService) { }

  ngAfterViewInit() {
    const card = this.animationCtrl
      .create()
      .addElement(this.cardElements.first.nativeElement)
      .duration(750)
      .beforeStyles({
        filter: 'invert(75%)',
      })
      .beforeClearStyles(['box-shadow'])
      .afterStyles({
        'box-shadow': 'rgba(255, 0, 50, 0.4) 0px 4px 16px 6px',
      })
      .afterClearStyles(['filter'])
      .keyframes([
        { offset: 0, transform: 'scale(1)' },
        { offset: 0.7, transform: 'scale(1.5)' },
        { offset: 1, transform: 'scale(1)' },
      ]);

    this.animation = this.animationCtrl.create().duration(750).addAnimation([card]);
  }

  play() {
    if (this.animation) {
      this.animation.play();
    }
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'No debe quedar vacío el campo';
    }
    return this.email.hasError('email') ? 'No es un email válido' : '';
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'La contraseña y el correo no son válidos',
      duration: 950,
      position: 'middle',
    });
    await toast.present();
  }


  async iniciarSesion(correo: string, contrasena: string): Promise<void> {
    const usuario = await this.bdService.buscarUsuarioPorCorreoYContrasena(correo, contrasena);

    if (usuario) {
      localStorage.setItem('idUsuario', usuario.idUsuario.toString());
      localStorage.setItem('nombreU', usuario.nombreU);
      localStorage.setItem('idRol', usuario.idRol.toString());

      this.bdService.isDBReady.next(true);

      this.mostrarMensaje('Inicio de sesión exitoso');
    } else {
      
      this.mostrarMensaje('Credenciales inválidas');
    }
    this.router.navigate(['/tienda'])
  }

  async mostrarMensaje(mensaje: string): Promise<void> {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000, // Duración en milisegundos
      position: 'top' // Posición en la pantalla
    });
    await toast.present();
  }



  irADatosPersonales(correo: string) {
    const navigationExtras: NavigationExtras = {
      state: {
        roles: this.rol,
        correo: correo,
      },
    };
    this.router.navigate(['/tienda'], navigationExtras);
  }
}
