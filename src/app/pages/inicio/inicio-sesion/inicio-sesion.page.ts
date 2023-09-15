import { Component, ElementRef, ViewChildren } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FormControl, Validators } from '@angular/forms';
import { AnimationController } from '@ionic/angular';
import { QueryList } from '@angular/core';
import { Animation } from '@ionic/angular';
import { IonCard } from '@ionic/angular';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.page.html',
  styleUrls: ['./inicio-sesion.page.scss'],
})
export class InicioSesionPage {
  rol: number = 0;
  gmail: string = '';
  password: string = '';
  //PARA QUE SE VEA EL OJITO DE LA CONTRASEÑA
  hide = true;
  //VALIDACION DEL CORREO:
  email = new FormControl('', [Validators.required, Validators.email]);
  //AQUI COMIENZA LA ANIMACION
  @ViewChildren(IonCard, { read: ElementRef }) cardElements!: QueryList<ElementRef<HTMLIonCardElement>>;
  private animation: Animation | null = null;

  constructor(private router: Router, private toastController: ToastController, private animationCtrl: AnimationController) { }

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
  //ACTIVA LA ANIMACION
  play() {
    if (this.animation) {
      this.animation.play();
    }
  }
  //MENSAJE DE ERROR DEL CORREO
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'No debe quedar vacio los campo';
    }
    return this.email.hasError('email') ? 'No es un email valido' : '';
  }
  //MENSAJE DE ERROR EN LOS DATOS
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'La contraseña y el correo no son validos',
      duration: 950,
      position: 'middle',
    });
    await toast.present();
  }

  inicio_sesion() {
    if ((this.gmail === 'admin@gmail.com' && this.password === 'Admin123.') ||
      (this.gmail === 'usuario@gmail.com' && this.password === 'Usuario123.')) {
      this.rol = (this.gmail === 'admin@gmail.com') ? 2 : 1;
      this.irADatosPersonales(this.gmail);
    } else {
      this.play();
      this.presentToast();
      return;
    }
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
