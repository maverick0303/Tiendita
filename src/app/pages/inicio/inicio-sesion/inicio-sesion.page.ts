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

  constructor(private router: Router, private toastController: ToastController, private animationCtrl: AnimationController, private bd: BdserviceService) { }

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

  inicio_sesion() {
    this.bd.verificarCredenciales(this.gmail, this.password)
      .then(usuarioValido => {
        console.log('Usuario válido:', usuarioValido); // Agrega este console.log
        if (usuarioValido) {
          const correo = this.gmail;
  
          this.bd.obtenerRolPorCorreo(correo)
            .then(idRol => {
              console.log('ID de rol:', idRol); // Agrega este console.log
              if (idRol !== null) {
                // Ir directamente a la página de tienda
                this.router.navigate(['/tienda']);
              } else {
                this.presentToast(); // El correo no está en la base de datos
              }
            });
        } else {
          this.play();
          this.presentToast();
        }
      });
  }
}  
