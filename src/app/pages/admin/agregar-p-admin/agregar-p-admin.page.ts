import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { BdserviceService } from 'src/app/services/bd.service';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Producto } from 'src/app/services/producto';

@Component({
  selector: 'app-agregar-p-admin',
  templateUrl: './agregar-p-admin.page.html',
  styleUrls: ['./agregar-p-admin.page.scss'],
})
export class AgregarPAdminPage implements OnInit {
  
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

  idUsuario: number;
  idRol: number;
  image2: any;
  nombrePValue: string = '';
  descripcionPValue: string = '';
  precioPValue: number = 1;
  stockPValue: number = 1;
  imagenPValue: any;
  categoriaPValue: string = '';

  arregloCategoria: any = [
    {
      idCategoria: '',
      nombreCategoria: ''
    }
  ]

  constructor(private router: Router, private db: BdserviceService, private cdr: ChangeDetectorRef) {
    this.idUsuario = parseInt(localStorage.getItem('idUsuario')!);
    this.idRol = parseInt(localStorage.getItem('idRol')!);
   }
  insertar() {
    
    const selectedCategoryId = this.categoriaPValue;

    this.db.insertarProducto(

      this.nombrePValue,
      this.descripcionPValue,
      this.precioPValue,
      this.stockPValue,
      this.imagenPValue,
      selectedCategoryId
    );
    this.db.mostrarAlerta("Producto Agregado con exito");

    const idRolActual = this.idRol; // Obtener el idRol actual
    const idRolEnLocalStorage = parseInt(localStorage.getItem('idRol')!); // Obtener el idRol del localStorage
  
    const navigationExtras: NavigationExtras = {
      queryParams: {
        idRol: idRolActual,
        idRolEnLocalStorage: idRolEnLocalStorage // Agregar el idRol del localStorage como parámetro
      }
    };
  
    this.router.navigate(['/tienda'], navigationExtras);
  }



  ngOnInit() {
    //subscribo al observable de la BD
    this.db.dbState().subscribe(res => {
      if (res) {
        this.db.fetchCategoria().subscribe(datos => {
          this.arregloCategoria = datos;
        })
      }
    })
    //Esto es de los productos:
    this.db.dbState().subscribe(res => {
      if (res) {
        this.db.fetchProducto().subscribe(datos => {
          this.arregloProductos = datos;
          
        })
      }
    })
  }



  limitarLongitudPrecio(event: any) {
    const maxLength = 10;
    if (event.target.value.length > maxLength) {
      event.target.value = event.target.value.slice(0, maxLength);
      this.precioPValue = parseInt(event.target.value, 10);
    }
  }


  validatePrecio(precioValue: number) {
    const firstDigit = String(precioValue).charAt(0);

    if (firstDigit === '0') {
      this.precioPValue = 1;
    }
    if (firstDigit === '-') {
      this.precioPValue = 1;
    }
  }
  async takePicture() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
      });

      this.imagenPValue = image.dataUrl;
      this.cdr.detectChanges(); // Esto actualiza la vista para que se muestre la imagen
    } catch (error) {
      console.error('Error al tomar la foto:', error);
    }
  }
  
}