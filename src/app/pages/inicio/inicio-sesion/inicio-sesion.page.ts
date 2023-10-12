import { Component, ElementRef, ViewChildren } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FormControl, Validators } from '@angular/forms';
import { AnimationController } from '@ionic/angular';
import { QueryList } from '@angular/core';
import { Animation } from '@ionic/angular';
import { IonCard } from '@ionic/angular';
import { BdserviceService } from 'src/app/services/bd.service';


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

  constructor(private router: Router, private toastController: ToastController, private animationCtrl: AnimationController, private bdService: BdserviceService) {
    this.rol = parseInt(localStorage.getItem('idRol')!);
  }

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
  
  toggleHide() {
    this.hide = !this.hide;
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


  async iniciarSesion(): Promise<void> {
    if (!this.correo || !this.contrasena) {
      this.mostrarMensaje('Por favor, ingrese correo y contraseña');
      return;
    }
    const usuario = await this.bdService.buscarUsuarioPorCorreoYContrasena(this.correo, this.contrasena);
    if (!usuario) {
      this.mostrarMensaje('Credenciales inválidas');
      return;
    }
    localStorage.setItem('idUsuario', usuario.idUsuario.toString());
    localStorage.setItem('nombreU', usuario.nombreU);
    localStorage.setItem('apellidoU', usuario.apellidoU);
    localStorage.setItem('correoU', usuario.correoU);
    localStorage.setItem('rutU', usuario.rutU);
    localStorage.setItem('idRol', usuario.idRol.toString());
    localStorage.setItem('fotoU', usuario.fotoU);
    this.bdService.isDBReady.next(true);
    this.mostrarMensaje('Inicio de sesión exitoso');
    this.router.navigate(['/tienda', { idRol: usuario.idRol }]);
  }
  



  async mostrarMensaje(mensaje: string): Promise<void> {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000, // Duración en milisegundos
      position: 'top' // Posición en la pantalla
    });
    await toast.present();
  }

}
