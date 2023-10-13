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
  arregloProductosResultado: Producto[] = []; // Nueva propiedad
  searchTerm: string = '';
  arregloProductos: any = [
    {
      idProducto: '',
      nombreProducto: '',
      descripcion: '',
      precio: '',
      stock: '',
      nombreCategoria: '',
      foto: ''
    }
  ]
  iduser = "";

  image: any;
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
  fotoUEnviada: string = '';
  //mensaje de error:
  errors = {
    nombreEnviado: '',
    apellidoEnviado: '',
  };
  formularioValido: boolean = false;


  constructor(private router: Router, private activedRouter: ActivatedRoute, public bd: BdserviceService, private cdr: ChangeDetectorRef) {
    this.iduser = localStorage.getItem('idUsuario')!;
  }
  editar() {
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
    // Subscribo al observable de la BD
    this.bd.dbState().subscribe(res => {
      if (res) {
        this.bd.fetchProducto().subscribe(datos => {
          this.arregloProductos = datos;
          this.arregloProductosResultado = datos;
        })
      }
    })
    this.loadProducts();
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

  //ESTO ES DE LA FOTO    
  takePicture = async () => {
    const image2 = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl
    });
    this.bd.imageData = image2.dataUrl;
    this.cdr.detectChanges();
  };
  loadProducts() {
    // Llama a la función para cargar productos (deberías tener esta función en tu servicio)
    this.bd.fetchProducto().subscribe((productos) => {
      this.arregloProductos = productos;
    });
  }

  searchProducts() {
    if (this.searchTerm.trim() !== '') {
      // Utiliza la función buscarProductoPorNombre para buscar productos
      this.bd
        .buscarProductoPorNombre(this.searchTerm.trim())
        .then((productos) => {
          this.arregloProductosResultado = productos;

          // Redirige al usuario a la página de la tienda con el término de búsqueda como parámetro de consulta
          this.router.navigate(['/tienda'], {
            queryParams: { searchTerm: this.searchTerm.trim() }
          });
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    } else {
      // Si el término de búsqueda está vacío, muestra todos los productos
      this.arregloProductosResultado = this.arregloProductos;
    }
  }
}


