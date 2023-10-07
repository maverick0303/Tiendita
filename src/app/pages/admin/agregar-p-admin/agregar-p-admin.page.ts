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
    this.db.dbState().subscribe(res => {
      if (res) {
        this.db.fetchProducto().subscribe(datos => {
          this.arregloProductos = datos;
          this.arregloProductosResultado = datos;
        })
      }
    })
    this.loadProducts();
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
  loadProducts() {
    // Llama a la función para cargar productos (deberías tener esta función en tu servicio)
    this.db.fetchProducto().subscribe((productos) => {
      this.arregloProductos = productos;
    });
  }

  searchProducts() {
    if (this.searchTerm.trim() !== '') {
      // Utiliza la función buscarProductoPorNombre para buscar productos
      this.db
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