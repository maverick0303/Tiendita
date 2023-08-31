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

  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);

  @ViewChildren(IonCard, { read: ElementRef }) cardElements!: QueryList<ElementRef<HTMLIonCardElement>>;
  private animation: Animation | null = null;

  constructor(private router: Router, private toastController: ToastController, private animationCtrl: AnimationController) { }

  ngAfterViewInit() {
    const card = this.animationCtrl
      .create()
      .addElement(this.cardElements.first.nativeElement)
      .duration(2000)
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
        { offset: 0.5, transform: 'scale(1.5)' },
        { offset: 1, transform: 'scale(1)' },
      ]);

    this.animation = this.animationCtrl.create().duration(2000).addAnimation([card]);
  }

  play() {
    if (this.animation) {
      this.animation.play();
    }
  }

  pause() {
    if (this.animation) {
      this.animation.pause();
    }
  }

  stop() {
    if (this.animation) {
      this.animation.stop();
    }
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Debes ingresar un email :)';
    }
    return this.email.hasError('email') ? 'No es un email valido' : '';
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Los datos proporcionados no coinciden',
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

  borrarDatos() {
    this.gmail = ''; 
    this.password = '';    
  }
}
