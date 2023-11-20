import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Camera, CameraResultType } from '@capacitor/camera';
import { BdserviceService } from 'src/app/services/bd.service';
import { Producto } from 'src/app/services/producto';

@Component({
  selector: 'app-m-datos',
  templateUrl: './m-datos.page.html',
  styleUrls: ['./m-datos.page.scss'],
})
export class MDatosPage implements OnInit {

  imageData: any;
  iduser = "";
  nombreEnviado: string = '';
  apellidoEnviado: string = '';
  emailEnviado: string = '';
  rutEnviado: string = '';
  contrasenaEnviada: string = '';
  idRolEnviado: string = '';
  respuestaEnviada: string = '';
  nombrePreguntaEnviada: string = '';
  idVentaEnviada: string = '';
  idUsuario = "";
  fotoUEnviada: any;

  //mensaje de error:

  errors = {
    nombreEnviado: '',
    apellidoEnviado: '',
    fotoUEnviada: '',
  };

  formularioValido: boolean = false;

  constructor(private router: Router, private activedRouter: ActivatedRoute, public bd: BdserviceService, private cdr: ChangeDetectorRef) {
    this.iduser = localStorage.getItem('idUsuario')!;
  }

  editar() {
    if (this.formularioValido) {
      console.log("Datos a actualizar:", this.idUsuario, this.nombreEnviado, this.apellidoEnviado, this.rutEnviado, this.emailEnviado, this.fotoUEnviada);

      this.bd.actualizarUsuario(
        this.idUsuario,
        this.nombreEnviado,
        this.apellidoEnviado,
        this.rutEnviado,
        this.emailEnviado,
        this.fotoUEnviada
      );

      this.bd.presentAlertMD("Usuario actualizado con éxito")
      this.router.navigate(['/datos-personales']);
    } else {
      this.bd.presentAlertMD("Por favor, complete todos los campos correctamente.");
    }
  }

  ngOnInit() {
    this.bd.getUsuarioAutenticadoDesdeBD(this.iduser).then(usuario => {
      if (usuario) {
        this.idUsuario = usuario.idUsuario;
        this.nombreEnviado = usuario.nombreU;
        this.apellidoEnviado = usuario.apellidoU;
        this.emailEnviado = usuario.correoU;
        this.rutEnviado = usuario.rutU;
        this.fotoUEnviada = usuario.fotoU;
      }
    });
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === ' ') {
      event.preventDefault();
    }
  }

  //comienzo de las validaciones

  valiNombre(event: KeyboardEvent) {
    const input = event.key;
    const regex = /^[A-Za-z]+$/; // Solo permite letras

    if (!regex.test(input)) {
      event.preventDefault(); // No permite que ingrese caracteres no válidos
      this.errors.nombreEnviado = 'El nombre solo debe contener letras.';
    } else {
      this.errors.nombreEnviado = '';
    }

    this.validarFormulario();
  }

  ValiApellido(event: KeyboardEvent) {
    const input = event.key;
    const apellido = /^[A-Za-z]+$/; // Solo permite letras

    if (!apellido.test(input)) {
      event.preventDefault(); // No permite que ingrese caracteres no válidos
      this.errors.apellidoEnviado = 'El apellido solo debe contener letras.';
    } else {
      this.errors.apellidoEnviado = '';
    }

    this.validarFormulario();
  }

  validarFormulario() {
    let hasError = false;

    // Validación del nombre
    this.errors.nombreEnviado = '';
    if (!/^[A-Za-z]+$/.test(this.nombreEnviado) || this.nombreEnviado.length < 1 || this.nombreEnviado.length > 15) {
      this.errors.nombreEnviado = 'El nombre solo debe contener letras y tener entre 1 y 15 caracteres.';
      hasError = true;
    }

    // Validación del apellido
    this.errors.apellidoEnviado = '';
    if (!/^[A-Za-z]+$/.test(this.apellidoEnviado) || this.apellidoEnviado.length < 1 || this.apellidoEnviado.length > 15) {
      this.errors.apellidoEnviado = 'El apellido solo debe contener letras y tener entre 1 y 15 caracteres.';
      hasError = true;
    }

    // Validación de la foto
    this.errors.fotoUEnviada = '';
    if (!this.fotoUEnviada) {
      this.errors.fotoUEnviada = 'Debe seleccionar una foto.';
      hasError = true;
    }

    // Validación adicional para comprobar si todos los campos requeridos están llenos
    if (
      !this.nombreEnviado ||
      !this.apellidoEnviado ||
      !this.fotoUEnviada
    ) {
      hasError = true;
    }

    this.formularioValido = !hasError;
  }

  //ESTO ES DE LA FOTO    
  async takePicture() {
    try {
      const image2 = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl
      });
      this.fotoUEnviada = image2.dataUrl;
      this.validarFormulario(); // Validar después de seleccionar la foto
      this.cdr.detectChanges();
    } catch (error) {
      console.error('Error al tomar la foto:', error);
    }
  }
}
