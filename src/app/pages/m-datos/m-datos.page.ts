import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Camera, CameraResultType } from '@capacitor/camera';
  import { BdserviceService } from 'src/app/services/bd.service';


@Component({
  selector: 'app-m-datos',
  templateUrl: './m-datos.page.html',
  styleUrls: ['./m-datos.page.scss'],
})
export class MDatosPage implements OnInit {
  image: any;
  nombreEnviado: string = '';
  apellidoEnviado: string = '';
  emailEnviado: string = '';
  rutEnviado: string = '';
  //mensaje de error:
  errors = {
    nombreEnviado: '',
    apellidoEnviado: '',
  };
  formularioValido: boolean = false;


  constructor(private route: ActivatedRoute,public bd: BdserviceService,private cdr: ChangeDetectorRef) { }
  ngOnInit() {
    // Access the state property directly
    this.route.paramMap.subscribe(params => {
      const state = window.history.state;
      this.nombreEnviado = state.nombreEnviado;
      this.apellidoEnviado = state.apellidoEnviado;
      this.rutEnviado = state.rutEnviado;
      this.emailEnviado = state.emailEnviado;
    });
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === ' ') {
      event.preventDefault();
    }
  }

  //comienzo de las vallidaciones

  valiNombre(event: KeyboardEvent) {
    const input = event.key;
    const regex = /^[A-Za-z]+$/; // Solo permite letras

    if (!regex.test(input)) {
      event.preventDefault(); // No permite que ingrese caracteres no válidos
      this.errors.nombreEnviado = 'El nombre solo debe contener letras.';
    } else {
      this.errors.nombreEnviado = '';
    }
    this.verificarFormulario();
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
    this.verificarFormulario();
  }
  //verificar si esta todo bien:
  verificarFormulario() {
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
    // Validación adicional para comprobar si todos los campos requeridos están llenos
    if (
      !this.nombreEnviado ||
      !this.apellidoEnviado
    ) {
      hasError = true;
    }

    this.formularioValido = !hasError;
  }

  //ESTO ES DE LA FOTO:

  takePicture = async () => {
    const image2 = await Camera.getPhoto({
      quality:90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl
    });
     this.bd.imageData = image2.dataUrl;
     this.cdr.detectChanges();
  };
  

}

