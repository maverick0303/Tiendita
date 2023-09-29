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
  gmail: string = '';
  password: string = '';
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

  async iniciarSesion() {
    const correo = this.gmail; 
    const contrasena = this.password; 
  
    const inicioSesionExitoso = await this.bdService.iniciarSesion(correo, contrasena);
  
    if (inicioSesionExitoso) {
      console.log('Inicio de sesión exitoso');
  
      const toast = await this.toastController.create({
        message: 'Inicio de sesión exitoso',
        duration: 2000, 
        position: 'middle'
      });
  
      await toast.present();
  
      this.irADatosPersonales(correo);
    } else {
      console.log('Credenciales incorrectas');
  
      const toast = await this.toastController.create({
        message: 'Credenciales incorrectas',
        duration: 2000, 
        position: 'middle'
      });
  
      await toast.present();
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
