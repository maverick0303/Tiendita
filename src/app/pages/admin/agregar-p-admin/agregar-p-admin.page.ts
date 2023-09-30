import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { BdserviceService } from 'src/app/services/bd.service';
import { Camera, CameraResultType } from '@capacitor/camera';
@Component({
  selector: 'app-agregar-p-admin',
  templateUrl: './agregar-p-admin.page.html',
  styleUrls: ['./agregar-p-admin.page.scss'],
})
export class AgregarPAdminPage implements OnInit {
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

  constructor(private router:Router, private db: BdserviceService,private cdr: ChangeDetectorRef) { }
  insertar() {
  // Make sure to replace 'selectedCategoryId' with the actual value you want to assign to 'idCategoria'.
  const selectedCategoryId = this.categoriaPValue;

  this.db.insertarProducto(
    
    this.nombrePValue,
    this.descripcionPValue,
    this.precioPValue,
    this.stockPValue,
    this.imagenPValue,
    selectedCategoryId
  );
}

  

  ngOnInit() {
    //subscribo al observable de la BD
    this.db.dbState().subscribe(res=>{
      if(res){
        this.db.fetchCategoria().subscribe(datos=>{
          this.arregloCategoria = datos;
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