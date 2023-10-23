import { Component, OnInit } from '@angular/core';
import { BdserviceService } from 'src/app/services/bd.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-modificar-clave',
  templateUrl: './modificar-clave.page.html',
  styleUrls: ['./modificar-clave.page.scss'],
})
export class ModificarClavePage implements OnInit {

  idEnviado: string = '';
  contrasenaN: string = '';
  contrasena1: string = '';
  contrasena2: string = '';
  contrasena3: string = '';

  errors = {

    password: '',
    confirmPassword: ''
  };

  formularioValido: boolean = false;

  constructor(private router: Router, private bdService: BdserviceService) {
    this.idEnviado = localStorage.getItem('idUsuario')!;
  }

  ngOnInit() {
    this.bdService.getUsuarioAutenticadoDesdeBD(this.idEnviado).then(usuario => {
      if (usuario) {
        this.idEnviado = usuario.idUsuario;
      }
    });

  }

  async modificarContrasena() {
    let usuario = {
      idUsuario: this.idEnviado,
      contrasena: this.contrasenaN
    };

    let navigationExtras: NavigationExtras = {
      state: {
        idEnviado: this.idEnviado,
        contrasena: this.contrasena3
      }
    };
    this.router.navigate(['/inicio-sesion'], navigationExtras);
  }

  valiPassword(event: KeyboardEvent) {
    const input = event.key;

    // Expresión regular para validar la contraseña permitiendo "."
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.]).{5,15}$/;

    if (input !== "Backspace" && !passwordRegex.test(input)) {
      event.preventDefault(); // No permite caracteres no válidos
    }
    this.verificarFormulario();
  }
  verificarFormulario() {
    let hasError = false;

    // Validación de la contraseña
    this.errors.password = '';
    if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{5,15}$/.test(this.contrasena1)) {
      this.errors.password = 'La contraseña no cumple con los requisitos.';
      hasError = true;
    }

    // Validación de la confirmación de contraseña
    this.errors.confirmPassword = '';
    if (this.contrasena1 !== this.contrasena2) {
      this.errors.confirmPassword = 'Las contraseñas no coinciden.';
      hasError = true;
    }
    // Validación adicional para comprobar si todos los campos requeridos están llenos
    if (

      !this.contrasena1 ||
      !this.contrasena2
    ) {
      hasError = true;
    }

    this.formularioValido = !hasError;
  }

  insertar() {
    this.bdService.claveNueva(
      this.idEnviado,
      this.contrasena1
    );
  }
}