import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuario } from './usuario';
import { Pregunta } from './pregunta';
import { Detalle } from './detalle';
import { Producto } from './producto';
import { Categoria } from './categoria';
import { Venta } from './venta';
import { Storage } from '@ionic/storage-angular';
import { animate } from '@angular/animations';


@Injectable({
  providedIn: 'root'
})
export class BdserviceService {

  //Variable para manipular la conexión a la BD
  public database!: SQLiteObject;
  public imageData: any;

  //variables para la creación de tablas
  tablaCategoria: string = "CREATE TABLE IF NOT EXISTS categoria (idCategoria integer primary key autoincrement,  nombreCategoria VARCHAR(25) not null);";

  tablaRol: string = "CREATE TABLE IF NOT EXISTS rol (idRol integer primary key autoincrement,  nombreRol VARCHAR(25) not null);";

  tablaPregunta: string = "CREATE TABLE IF NOT EXISTS pregunta (idPregunta integer primary key autoincrement,  nombrePregunta VARCHAR(50) not null);";

  tablaProducto: string = "CREATE TABLE IF NOT EXISTS producto (idProducto integer primary key autoincrement, nombreProducto VARCHAR(25) not null, descripcion VARCHAR(100) not null, precio integer not null, stock integer not null, idCategoria integer not null, foto TEXT not null, FOREIGN KEY (idCategoria) REFERENCES categoria (idCategoria));";

  tablaDetalle: string = "CREATE TABLE IF NOT EXISTS detalle (idDetalle integer primary key autoincrement, cantidadProducto integer not null, subtotalD integer not null,idProducto integer not null,idVenta integer not null,  FOREIGN KEY (idProducto) REFERENCES producto(idProducto), FOREIGN KEY (idVenta) REFERENCES venta(idVenta));";

  tablaVenta: string = "CREATE TABLE IF NOT EXISTS venta (idVenta integer primary key autoincrement, totalV integer not null, carritoV VARCHAR(25) not null, fechaV VARCHAR(25) not null , idUsuario not null, FOREIGN KEY (idUsuario) REFERENCES usuario (idUsuario));";

  tablaUsuario: string = "CREATE TABLE IF NOT EXISTS usuario (idUsuario integer primary key autoincrement, nombreU VARCHAR(25) not null, apellidoU VARCHAR(25) not null, rutU VARCHAR(13) not null, correoU VARCHAR(25) not null, contrasenaU VARCHAR(15) not null, idRol not null, respuestaU VARCHAR(15) not null, idVenta not null, fotoU TEXT, usuarioPregunta number not null, FOREIGN KEY (idRol) REFERENCES rol(idRol), FOREIGN KEY (idVenta) REFERENCES venta(idVenta), foreign key (usuarioPregunta) references pregunta(idPregunta));";

  //variables de insert en las tablas de registros iniciales
  registroUsuario: string = "INSERT or IGNORE INTO usuario(idUsuario,nombreU,apellidoU,rutU,correoU,contrasenaU,idRol,respuestaU,idVenta,usuarioPregunta) VALUES (1,'Alfredo','Estay','21.126.681-3','alfr.estay@duocuc.cl','Alfredo123@',1,'r1',3,1);";

  registroUsuarioPredeterminado1: string = "INSERT or IGNORE INTO usuario(idUsuario,nombreU,apellidoU,rutU,correoU,contrasenaU,idRol,respuestaU,idVenta,usuarioPregunta) VALUES (2,'Admin','Admin','12.345.678-9','admin@gmail.com','Admin123@',2,'r1',1,1);";

  registroUsuarioPredeterminado2: string = "INSERT or IGNORE INTO usuario(idUsuario,nombreU,apellidoU,rutU,correoU,contrasenaU,idRol,respuestaU,idVenta,usuarioPregunta) VALUES (3,'Usuario','Usuario','9.876.543-2','usuario@gmail.com','Usuario123@',1,'r1',2,1);";

  registroPregunta2: string = "INSERT or IGNORE INTO pregunta(idPregunta, nombrePregunta) VALUES (1,'¿Cuál es tu pelicula favorita?');";
  registroPregunta1: string = "INSERT or IGNORE INTO pregunta(idPregunta, nombrePregunta) VALUES (2,'¿Cuál es el nombre de tu mascota?');";
  registroPregunta3: string = "INSERT or IGNORE INTO pregunta(idPregunta, nombrePregunta) VALUES (3,'¿Color favorito?');";

  //registro de categoria
  registroCategoria1: string = "INSERT Or IGNORE into categoria(idCategoria, nombreCategoria) VALUES (1,'Reloj digital');";
  registroCategoria2: string = "INSERT Or IGNORE into categoria(idCategoria, nombreCategoria) VALUES (2,'Reloj analógico');";
  registroCategoria3: string = "INSERT Or IGNORE into categoria(idCategoria, nombreCategoria) VALUES (3,'Audifono bluetooth');";
  registroCategoria4: string = "INSERT Or IGNORE into categoria(idCategoria, nombreCategoria) VALUES (4,'Audifono gamer');";
  registroCategoria5: string = "INSERT Or IGNORE into categoria(idCategoria, nombreCategoria) VALUES (5,'Reloj smartwatch');";

  //variable de Productos:
  prod1: string = "INSERT or IGNORE into producto(idProducto,nombreProducto, descripcion, precio, stock, idCategoria, foto) VALUES (1,'Audífonos gamers rojos con negro', 'Auriculares gamer rojos con diseño llamativo y elegante, brindando sonido inmersivo y comodidad en sus oidos.', 50000, 10, 4, 'assets/AUDIFONOS GAMERS/ag3.webp');";
  prod2: string = "INSERT or IGNORE into producto(idProducto,nombreProducto, descripcion, precio, stock, idCategoria, foto) VALUES (2,'Audífonos gamers negro con naranja', 'Auriculares gamer en negro con toques anaranjados que ofrecen sonido envolvente, comodidad ergonómica y estilo llamativo', 75000, 7, 4, 'assets/AUDIFONOS GAMERS/ag4.jpeg');";
  prod3: string = "INSERT or IGNORE into producto(idProducto,nombreProducto, descripcion, precio, stock, idCategoria, foto) VALUES (3,'Audífonos gamers lila con blanco','Estos audífonos con diseño atractivo, audio inmersivo,comodidad asegurada,son perfectos para quienes buscan rendimiento y estilo en un solo paquete.',35000,10,4,'assets/AUDIFONOS GAMERS/ag5.jpeg');";
  //audifonos inalambricos:
  prod4: string = "INSERT or IGNORE into producto(idProducto,nombreProducto, descripcion, precio, stock, idCategoria, foto) VALUES (4,'Audífonos Bluetooth morados','Estos audifonos con tono morado,ofrecen conectividad sin cables con estilo.Perfectos para quienes buscan comodidad y libertad en su experiencia auditiva.',39990, 10,3,'assets/AUDIFONOS BLUTU/a1.jpg');";
  prod5: string = "INSERT or IGNORE into producto(idProducto,nombreProducto, descripcion, precio, stock, idCategoria, foto) VALUES (5,'Audífonos Bluetooth azules','Estos audífonos en tono azul,ofrecen conectividad inalámbrica con un toque de frescura. Ideales para quienes buscan comodidad y estilo en su experiencia auditiva sin necesidad de cables.',42000,6,3,'assets/AUDIFONOS BLUTU/a4.jpg');";
  prod6: string = "INSERT or IGNORE into producto(idProducto,nombreProducto, descripcion, precio, stock, idCategoria, foto) VALUES (6,'Audífonos Bluetooth verde','Estos audífonos, brindan conectividad inalámbrica con un toque de naturaleza. Perfectos para quienes desean comodidad y un estilo distintivo en sus dispositivos de audio.',269000,12,3,'assets/AUDIFONOS BLUTU/a6.jpg');";
  //relojes analogicos
  prod7: string = "INSERT or IGNORE into producto(idProducto,nombreProducto, descripcion, precio, stock, idCategoria, foto) VALUES (7,'Reloj Analógico Negro con azules','Este reloj negro con acentos en azul, une elegancia y modernidad. Perfecto para quienes buscan un estilo sofisticado con un toque de color audaz en su reloj de pulsera.',119000,12,2,'assets/RELOJES ANALOGO/r3.webp');";
  prod8: string = "INSERT or IGNORE into producto(idProducto,nombreProducto, descripcion, precio, stock, idCategoria, foto) VALUES (8,'Reloj Analógico negro fondo azul','Este reloj con esfera en tono negro y fondo azul, fusiona elegancia y un toque de originalidad. Ideal para aquellos que buscan un reloj clásico pero con un detalle único que resalta su estilo.',194990,8,2,'assets/RELOJES ANALOGO/r4.jpeg');";
  prod9: string = "INSERT or IGNORE into producto(idProducto,nombreProducto, descripcion, precio, stock, idCategoria, foto) VALUES (9,'Reloj Analógico amarillo con negro','Reloj analógico en amarillo con fondo negro, aporta un contraste audaz y llamativo. Perfecto para quienes quieran destacar con un toque de color vibrante en su muñeca, sin dejar de ser elegante.',289000,10,2,'assets/RELOJES ANALOGO/r5.jpg');";
  //relojes digitales
  prod10: string = "INSERT or IGNORE into producto(idProducto,nombreProducto, descripcion, precio, stock, idCategoria, foto) VALUES (10,'Reloj Digital negro con borde azul','Reloj digital en negro con borde azul, fusiona elegancia con un toque de estilo contemporáneo.',61990,5,1,'assets/digitales/rd2.jpeg');";
  prod11: string = "INSERT or IGNORE into producto(idProducto,nombreProducto, descripcion, precio, stock, idCategoria, foto) VALUES (11,'Reloj Digital negro','Reloj digital en negro, brinda una estética moderna y minimalista. Ideal para quienes buscan simplicidad y funcionalidad en la visualización de la hora, manteniendo un estilo elegante.',54000,11,1,'assets/digitales/rd5.jpg');";
  prod12: string = "INSERT or IGNORE into producto(idProducto,nombreProducto, descripcion, precio, stock, idCategoria, foto) VALUES (12,'Reloj Digital blanco','Reloj digital blanco, combina estilo y funcionalidad de manera moderna. Perfecto para quienes buscan un reloj que resalte con un toque de color y una pantalla clara.',194990,5,1,'assets/digitales/rd6.jpeg');";
  //relojes smartwatch
  prod13: string = "INSERT or IGNORE into producto(idProducto,nombreProducto, descripcion, precio, stock, idCategoria, foto) VALUES (13,'Reloj Smartwatch azul','Este Smartwatch es un reloj moderno con funciones inteligentes. Con pantalla táctil y conexión al teléfono, muestra notificaciones y rastrea la salud. Diseño atractivo y personalizable.',139990,8,5,'assets/SMARTWATCH/rs1.webp');";
  prod14: string = "INSERT or IGNORE into producto(idProducto,nombreProducto, descripcion, precio, stock, idCategoria, foto) VALUES (14,'Reloj smartwatch naranja','Este reloj combina estilo y tecnología, se enlaza con tu  teléfono para notificaciones y  seguimiento de salud. Su llamativo  color naranja y opciones de personalización  lo hace muy moderno.',240000,10,5,'assets/SMARTWATCH/rs2.jpeg');";
  prod15: string = "INSERT or IGNORE into producto(idProducto,nombreProducto, descripcion, precio, stock, idCategoria, foto) VALUES (15,'Reloj Smartwatch morado','Este reloj fusiona moda y funcionalidad, se conecta a tu teléfono para notificaciones y monitoreo de salud. Su color y sus opciones de personalización lo convierten en un reloj elegante y útil.',360000,12,5,'assets/SMARTWATCH/rs3.jpeg');";
  //variables Observables para las consultas en las tablas
  listaUsuario = new BehaviorSubject([]);
  listaDetalle = new BehaviorSubject([]);
  listaProducto = new BehaviorSubject([]);
  listaPregunta = new BehaviorSubject([]);
  listaCategoria = new BehaviorSubject([]);
  listaMostrarProducto = new BehaviorSubject([]);

  total: number = 0;
  carrito = "Carrito";
  fecha = new Date().toLocaleDateString();
  idUser: any;

  //variable para manipulación del estatus de la BD
  public isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  //CONSTRUCTOR
  constructor(private alertController: AlertController, private sqlite: SQLite, private platform: Platform, private storage: Storage) {
    this.crearBD();
    this.initStorage();
  }

  //funciones para subscribirme al observable
  dbState() {
    return this.isDBReady.asObservable();
  }

  fetchUsuario(): Observable<Usuario[]> {
    return this.listaUsuario.asObservable();
  }
  fetchProducto(): Observable<Producto[]> {
    return this.listaProducto.asObservable();
  }
  fetchPregunta(): Observable<Pregunta[]> {
    return this.listaPregunta.asObservable();
  }
  fetchDetalle(): Observable<Detalle[]> {
    return this.listaDetalle.asObservable();
  }
  fetchCategoria(): Observable<Categoria[]> {
    return this.listaCategoria.asObservable();
  }
  fecthMostrarProducto(): Observable<Producto[]> {
    return this.listaMostrarProducto.asObservable();
  }


  buscarCarrito(idUsuario: any, tipo: any) {
    //this.presentAlert("Usuario: " + idUsuario);
    this.database.executeSql('SELECT * FROM venta where idUsuario = ? and carritoV = ?', [idUsuario, tipo]).then(res => {
      //this.presentAlert("Cantidad carrito: " + res.rows.length);
      if (res.rows.length > 0) {
        //hay una venta como carrito
        //this.presentAlert("Hay carrito, busco detalles");
        let items: Venta[] = [];
        //validar si existen registros
        if (res.rows.length > 0) {
          //procedo a recorrer y guardar
          for (var i = 0; i < res.rows.length; i++) {
            //agrego los datos a mi variable
            items.push({
              idVenta: res.rows.item(i).idVenta,
              totalV: res.rows.item(i).totalV,
              carritoV: res.rows.item(i).carritoV,
              fechaV: res.rows.item(i).fechaV,
              idUsuario: res.rows.item(i).idUsuario,
            });
          }
          localStorage.setItem("idVentaCarrito", items[0].idVenta);
          this.buscarDetalle(items[0].idVenta);
        }
      }
      if (res.rows.length <= 0) {
        //no hay ninguna venta
        this.total = 0;
        this.carrito = "Carrito";
        this.fecha = new Date().toLocaleDateString();
        this.idUser = localStorage.getItem("idUsuario");
        //this.presentAlert("Usuario logueado: " + this.idUser);
        this.database.executeSql('INSERT INTO venta (totalV, carritoV, fechaV, idUsuario) VALUES (?, ?, ?, ?)', [this.total, this.carrito, this.fecha, this.idUser]).then(res2 => {
          //this.presentAlert("No hay carrito, creo uno nuevo");
          //localStorage.setItem("idVentaCarrito", res2.rows.item(0).idVenta);
          this.buscarCarrito(this.idUser, "Carrito");
        }).catch(e => {
          //this.presentAlert("Error al crear nuevo carrito: " + JSON.stringify(e));
        })
      }
    }).catch(e => {
      //this.presentAlert("Error al buscar carrito: " + JSON.stringify(e));
    })
  }



  buscarDetalle(idVenta: any) {
    return this.database.executeSql('SELECT detalle.idDetalle, detalle.cantidadProducto, detalle.subtotalD, detalle.idVenta,producto.precio, producto.idProducto, producto.foto, producto.nombreProducto FROM detalle inner join producto where detalle.idProducto = producto.idProducto and detalle.idVenta = ?', [idVenta]).then(res => {
      //variable para almacenar la consulta
      let items: Detalle[] = [];
      //validar si existen registros
      if (res.rows.length > 0) {
        //procedo a recorrer y guardar
        for (var i = 0; i < res.rows.length; i++) {
          //agrego los datos a mi variable
          items.push({
            idDetalle: res.rows.item(i).idDetalle,
            cantidad: res.rows.item(i).cantidadProducto,
            subtotalD: res.rows.item(i).subtotalD,
            idVenta: res.rows.item(i).idVenta,
            precio: res.rows.item(i).precio,
            idProducto: res.rows.item(i).idProducto,
            foto: res.rows.item(i).foto,
            nombreProducto: res.rows.item(i).nombreProducto
          })
        }
      }
      //actualizar mi observable
      //this.presentAlert("prod: " + items[0].idVenta)
      this.listaDetalle.next(items as any);

    }).catch(e => {
      //this.presentAlert("error buscar detalle: " + JSON.stringify(e));
    })
  }

  //carrito:
  insertarVenta(totalV: number, carritoV: string, idUsuario: number) {
    const fechaActual = new Date().toLocaleDateString(); // Obtiene la fecha actual en formato de cadena (por ejemplo, "10/09/2023")

    return this.database.executeSql('INSERT INTO venta (totalV, carritoV, fechaV, idUsuario) VALUES (?, ?, ?, ?)', [totalV, carritoV, fechaActual, idUsuario])
      .then(res => {
        console.log('Venta insertada: ', res);
        // Retorna el ID de la venta recién insertada
        return res.insertId;
      })
      .catch(error => {
        console.error('Error al insertar venta: ', error);
        throw error;
      });
  }




  obtenerDatosVentas(): Promise<any[]> {
    return this.database.executeSql('SELECT venta.*, detalle.cantidadProducto, detalle.subtotalD, producto.* FROM venta LEFT JOIN detalle ON venta.idVenta = detalle.idVenta LEFT JOIN producto ON detalle.idProducto = producto.idProducto', [])
      .then(res => {
        let ventas: any[] = [];

        if (res.rows.length > 0) {
          for (let i = 0; i < res.rows.length; i++) {
            ventas.push({
              idVenta: res.rows.item(i).idVenta,
              totalV: res.rows.item(i).totalV,
              carritoV: res.rows.item(i).carritoV,
              fechaV: res.rows.item(i).fechaV,
              idUsuario: res.rows.item(i).idUsuario,
              cantidadProducto: res.rows.item(i).cantidadProducto,
              subtotalD: res.rows.item(i).subtotalD,
              // Otros campos de producto que puedas necesitar
              idProducto: res.rows.item(i).idProducto,
              nombreProducto: res.rows.item(i).nombreProducto,
              precio: res.rows.item(i).precio,
              stock: res.rows.item(i).stock,
              foto: res.rows.item(i).foto,
              // Agrega más campos según sea necesario
            });
          }
        }

        return ventas;
      })
      .catch(error => {
        console.error('Error al obtener datos de ventas: ', error);
        return [];
      });
  }


  agregarAlCarrito2(idProducto: any, cantidad: number): Promise<any> {
    // Obtener el ID de la venta/carrito actual
    const idVenta = localStorage.getItem("idVentaCarrito");

    // Verificar si idVenta es válido antes de usarlo
    if (idVenta !== null && idVenta !== undefined) {
      // Obtener el precio y otros detalles del producto
      return this.database.executeSql('SELECT producto.precio, producto.stock, detalle.* FROM detalle LEFT JOIN producto ON detalle.idProducto = producto.idProducto WHERE detalle.idProducto = ? AND detalle.idVenta = ?', [idProducto, idVenta])
        .then(res => {
          if (res.rows.length > 0) {
            // Producto ya existe en el carrito, actualiza la cantidad y el total
            const detalleExistente = res.rows.item(0);
            const nuevaCantidad = detalleExistente.cantidadProducto + cantidad;

            // Verificar si la nueva cantidad supera el stock disponible
            if (nuevaCantidad > detalleExistente.stock) {
              //this.presentAlert("Error: La cantidad solicitada supera el stock disponible");
              return Promise.reject("Error: La cantidad solicitada supera el stock disponible");
            }

            let nuevoTotal;
            if (cantidad === 1) {
              nuevoTotal = detalleExistente.precio; 
            } else {
              nuevoTotal = detalleExistente.precio + (detalleExistente.precio * nuevaCantidad);
            }

            return this.database.executeSql('UPDATE detalle SET cantidadProducto = ?, subtotalD = ? WHERE idProducto = ? AND idVenta = ?', [nuevaCantidad, nuevoTotal, idProducto, idVenta])
              .then(() => {
                // Actualizar el observable
                this.buscarDetalle(idVenta);
              })
              .catch(error => {
                this.presentAlert("Error al actualizar la cantidad y el total en el carrito: " + JSON.stringify(error));
                return Promise.reject("Error al actualizar la cantidad y el total en el carrito: " + JSON.stringify(error));
              });
          } else {
            // Producto no existe en el carrito, inserta un nuevo registro
            return this.database.executeSql('INSERT INTO detalle(cantidadProducto, subtotalD, idProducto, idVenta) VALUES (?, ?, ?, ?)', [cantidad, this.total, idProducto, idVenta])
              .then(() => {
                // Actualizar el observable
                this.buscarDetalle(idVenta);
              })
              .catch(error => {
                this.presentAlert("Error al insertar en el carrito: " + JSON.stringify(error));
                return Promise.reject("Error al insertar en el carrito: " + JSON.stringify(error));
              });
          }
        })
        .catch(e => {
          // Manejar errores
          //this.presentAlert("Error al buscar el producto en el carrito: " + JSON.stringify(e));
          return Promise.reject("Error al buscar el producto en el carrito: " + JSON.stringify(e));
        });
    } else {
      // Manejar el caso en que idVenta no es válido
      this.presentAlert("Error: ID de venta/carrito no válido");
      return Promise.reject("ID de venta/carrito no válido");
    }
  }

  eliminarProductosDelCarrito(): Observable<any> {
    this.database.executeSql('DELETE FROM detalle');
    return new Observable(observer => {
      observer.next('Productos eliminados con éxito');
      observer.complete();
    });
  }
  

  realizarCompra(idUsuario: any) {
    const idVentaCarrito = localStorage.getItem("idVentaCarrito");
  
    if (idVentaCarrito) {
      // Obtener la fecha actual
      const fechaCompra = new Date().toLocaleDateString();
  
      // Obtener el total del carrito
      this.database.executeSql('SELECT SUM(subtotalD) as totalCompra FROM detalle WHERE idVenta = ?', [idVentaCarrito])
        .then(res => {
          if (res.rows.length > 0) {
            const totalCompra = res.rows.item(0).totalCompra || 0;
  
            // Actualizar el estado del carrito a "vendido"
            this.database.executeSql('UPDATE venta SET carritoV = ?, fechaV = ?, totalV = ? WHERE idVenta = ?', ['vendido', fechaCompra, totalCompra, idVentaCarrito])
              .then(() => {
                // Reiniciar el ID del carrito en el almacenamiento local
                localStorage.removeItem("idVentaCarrito");
  
                // Presentar una alerta o mensaje de éxito
                this.presentAlert("Compra realizada con éxito");
                location.reload();
  
                // Puedes realizar otras acciones después de completar la compra, si es necesario
              })
              .catch(error => {
                this.presentAlert("Error al actualizar el estado del carrito: " + JSON.stringify(error));
              });
          } else {
            this.presentAlert("Error: No se pudo obtener el total de la compra");
          }
        })
        .catch(error => {
          this.presentAlert("Error al obtener el total de la compra: " + JSON.stringify(error));
        });
    } else {
      this.presentAlert("Error: ID de venta/carrito no válido");
    }
  }
  


  buscarProductoPorNombre(nombre: string): Promise<Producto[]> {
    return this.database.executeSql('SELECT * FROM producto WHERE nombreProducto LIKE ?', ['%' + nombre + '%']).then(res => {
      // Variable para almacenar la consulta
      let items: Producto[] = [];
      // Validar si existen registros
      if (res.rows.length > 0) {
        // Procedo a recorrer y guardar
        for (var i = 0; i < res.rows.length; i++) {
          // Agrego los datos a mi variable
          items.push({
            idProducto: res.rows.item(i).idProducto,
            nombreProducto: res.rows.item(i).nombreProducto,
            descripcion: res.rows.item(i).descripcion,
            precio: res.rows.item(i).precio,
            stock: res.rows.item(i).stock,
            foto: res.rows.item(i).foto,
            idCategoria: res.rows.item(i).idCategoria,
          });
        }
      }
      // Actualizar mi observable
      this.listaMostrarProducto.next(items as any);
      return items;
    }).catch(error => {
      console.error('Error al buscar producto por nombre: ', error);
      return [];
    });
  }


  buscarUsuario() {
    return this.database.executeSql('SELECT * FROM usuario', []).then(res => {
      //variable para almacenar la consulta
      let items: Usuario[] = [];
      //validar si existen registros
      if (res.rows.length > 0) {
        //procedo a recorrer y guardar
        for (var i = 0; i < res.rows.length; i++) {
          //agrego los datos a mi variable
          items.push({
            idUsuario: res.rows.item(i).idUsuario,
            nombreU: res.rows.item(i).nombreU,
            apellidoU: res.rows.item(i).apellidoU,
            rutU: res.rows.item(i).rutU,
            correoU: res.rows.item(i).correoU,
            claveU: res.rows.item(i).clave,
            idRol: res.rows.item(i).idRol,
            respuestaU: res.rows.item(i).respuestaU,
            idVenta: res.rows.item(i).idVenta,
            fotoU: res.rows.item(i).fotoU,
            usuarioPregunta: res.rows.item(i).usuarioPregunta
          })
        }
      }
      //actualizar mi observable
      this.listaUsuario.next(items as any);

    })
  }

  mostrarCategoria(idCategoria: number) {
    return this.database.executeSql('SELECT * FROM producto WHERE idCategoria = ?', [idCategoria]).then(res => {
      //variable para almacenar la consulta
      let items: Producto[] = [];
      //validar si existen registros
      if (res.rows.length > 0) {
        //procedo a recorrer y guardar
        for (var i = 0; i < res.rows.length; i++) {
          //agrego los datos a mi variable
          items.push({
            idProducto: res.rows.item(i).idProducto,
            nombreProducto: res.rows.item(i).nombreProducto,
            descripcion: res.rows.item(i).descripcion,
            precio: res.rows.item(i).precio,
            stock: res.rows.item(i).stock,
            foto: res.rows.item(i).foto,
            idCategoria: res.rows.item(i).idCategoria,
          })
        }
      }
      //actualizar mi observable
      this.listaMostrarProducto.next(items as any);
    }).catch(e => {
      this.presentAlert("Error en mostrar productos por categoría: " + e);
    })
  }


  buscarPregunta() {
    return this.database.executeSql('SELECT * FROM pregunta', []).then(res => {
      //variable para almacenar la consulta
      let items: Pregunta[] = [];
      //validar si existen registros
      if (res.rows.length > 0) {
        //procedo a recorrer y guardar
        for (var i = 0; i < res.rows.length; i++) {
          //agrego los datos a mi variable
          items.push({
            idPregunta: res.rows.item(i).idPregunta,
            nombrePregunta: res.rows.item(i).nombrePregunta
          })
        }
      }
      //actualizar mi observable
      this.listaPregunta.next(items as any);

    }).catch(e => {
      this.presentAlert("error en buscar pregunta: " + e);
    })
  }

  buscarProducto() {
    return this.database.executeSql('SELECT * FROM producto', []).then(res => {
      //variable para almacenar la consulta
      let items: Producto[] = [];
      //validar si existen registros
      if (res.rows.length > 0) {
        //procedo a recorrer y guardar
        for (var i = 0; i < res.rows.length; i++) {
          //agrego los datos a mi variable
          items.push({
            idProducto: res.rows.item(i).idProducto,
            nombreProducto: res.rows.item(i).nombreProducto,
            descripcion: res.rows.item(i).descripcion,
            precio: res.rows.item(i).precio,
            stock: res.rows.item(i).stock,
            foto: res.rows.item(i).foto,
            idCategoria: res.rows.item(i).idCategoria
          })
        }
      }
      //actualizar mi observable
      this.listaProducto.next(items as any);

    })
  }


  //


  //
  buscarCategoria() {
    return this.database.executeSql('SELECT * FROM categoria', []).then(res => {
      //variable para almacenar la consulta
      let items: Categoria[] = [];
      //validar si existen registros
      if (res.rows.length > 0) {
        //procedo a recorrer y guardar
        for (var i = 0; i < res.rows.length; i++) {
          //agrego los datos a mi variable
          items.push({
            idCategoria: res.rows.item(i).idCategoria,
            nombreCategoria: res.rows.item(i).nombreCategoria
          })
        }
      }
      //actualizar mi observable
      this.listaCategoria.next(items as any);

    })
  }

  //FUNCIONES PARA INSERTAR EN LAS TABLAS


  //FUNCIONES DE USUARIOS

  claveNueva(idUsuario: any, contrasenaU: any) {
    return this.database.executeSql('update usuario set contrasenaU = ? where idUsuario = ?', [contrasenaU, idUsuario]).then(res => {
      this.buscarUsuario();
    });
  }

  insertarUsuario(nombreU: any, apellidoU: any, rutU: any, correoU: any, contrasenaU: any, idRol: any, respuestaU: any, idVenta: any, fotoU: any, usuarioPregunta: any) {
    return this.database.executeSql('INSERT INTO usuario(nombreU,apellidoU ,rutU , correoU ,contrasenaU, idRol, respuestaU, idVenta, fotoU,usuarioPregunta ) VALUES (?,?,?,?,?,?,?,?,?,?)', [nombreU, apellidoU, rutU, correoU, contrasenaU, idRol, respuestaU, idVenta, fotoU, usuarioPregunta]).then(res => {
      this.buscarUsuario();
    })
  }
  actualizarUsuario(idUsuario: any, nombreU: any, apellidoU: any, rutU: any, correoU: any, fotoU: any) {
    console.log("Actualizando usuario:", idUsuario, nombreU, apellidoU, rutU, correoU, fotoU);

    return this.database.executeSql('UPDATE usuario SET nombreU = ?, apellidoU = ?, rutU = ?, correoU = ?, fotoU = ? WHERE idUsuario = ?', [nombreU, apellidoU, rutU, correoU, fotoU, idUsuario]).then(res => {
      console.log("Usuario actualizado:", res);
      this.buscarUsuario();
    });
  }

  eliminarUsuario(idUsuario: any) {
    return this.database.executeSql('DELETE FROM usuario WHERE idUsuario = ?', [idUsuario]).then(res => {
      this.buscarUsuario();
    });
  }

  //INSERTAR
  insertarProducto(nombreProducto: any, descripcion: any, precio: any, stock: any, foto: any, idCategoria: any) {
    return this.database.executeSql('INSERT INTO producto(nombreProducto, descripcion, precio, stock, foto, idCategoria) VALUES (?,?,?,?,?,?)', [nombreProducto, descripcion, precio, stock, foto, idCategoria]).then(res => {
      this.buscarProducto();
    });
  }


  //ACTUALIZAR TABLAS
  actualizarProducto(idProducto: any, nombreProducto: any, descripcion: any, precio: any, stock: any, foto: any, idCategoria: any) {
    return this.database.executeSql('UPDATE producto SET nombreProducto = ?, descripcion = ?, precio = ?, stock = ?, foto = ?, idCategoria = ?  WHERE idProducto = ?', [nombreProducto, descripcion, precio, stock, foto, idCategoria, idProducto]).then(res => {
      this.buscarProducto();
    })
  }

  //BORRAR ALGO DE LAS TABLAS
  eliminarProducto(idProducto: any) {
    return this.database.executeSql('DELETE FROM producto WHERE idProducto = ?', [idProducto]).then(res => {
      this.buscarProducto();
    })
  }

  //funcion para crear la BD
  crearBD() {
    //verificamos que la plataforma esta lista
    this.platform.ready().then(() => {
      //crear la BD
      this.sqlite.create({
        name: 'bdtienditatest3.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        //guardamos la conexión en mi variable global
        this.database = db;
        //llamar a la funcion que crea las tablas
        this.crearTablas();
      }).catch(e => {
        //capturamos y mostramos el error en la creacion de la BD
        this.presentAlert("Error en Crear BD: " + e);
      })
    })
  }

  async crearTablas() {
    try {
      //ejecutar la creación de tablas
      await this.database.executeSql(this.tablaCategoria, []);
      await this.database.executeSql(this.tablaRol, []);
      await this.database.executeSql(this.tablaPregunta, []);
      await this.database.executeSql(this.tablaProducto, []);
      await this.database.executeSql(this.tablaVenta, []);
      await this.database.executeSql(this.tablaDetalle, []);
      await this.database.executeSql(this.tablaUsuario, []);

      //ejecuto los registros de usuarios
      await this.database.executeSql(this.registroUsuario, []);
      await this.database.executeSql(this.registroUsuarioPredeterminado1, []);
      await this.database.executeSql(this.registroUsuarioPredeterminado2, []);

      //registros de preguntas
      await this.database.executeSql(this.registroPregunta1, []);
      await this.database.executeSql(this.registroPregunta2, []);
      await this.database.executeSql(this.registroPregunta3, []);

      //REGISTROS DE CATEGORIAS
      await this.database.executeSql(this.registroCategoria1, []);
      await this.database.executeSql(this.registroCategoria2, []);
      await this.database.executeSql(this.registroCategoria3, []);
      await this.database.executeSql(this.registroCategoria4, []);
      await this.database.executeSql(this.registroCategoria5, []);

      //REGISTROS DE PRODUCTOS
      await this.database.executeSql(this.prod1, []);
      await this.database.executeSql(this.prod2, []);
      await this.database.executeSql(this.prod3, []);
      await this.database.executeSql(this.prod4, []);
      await this.database.executeSql(this.prod5, []);
      await this.database.executeSql(this.prod6, []);
      await this.database.executeSql(this.prod7, []);
      await this.database.executeSql(this.prod8, []);
      await this.database.executeSql(this.prod9, []);
      await this.database.executeSql(this.prod10, []);
      await this.database.executeSql(this.prod11, []);
      await this.database.executeSql(this.prod12, []);
      await this.database.executeSql(this.prod13, []);
      await this.database.executeSql(this.prod14, []);
      await this.database.executeSql(this.prod15, []);

      //actualizar el estatus de la BD
      this.isDBReady.next(true);
      this.buscarUsuario();
      this.buscarProducto();
      this.buscarPregunta();
      this.buscarCategoria();

    } catch (e) {
      //capturamos y mostramos el error en la creacion de las tablas
      this.presentAlert("Error en Crear Tablas: " + e);
    }
  }

  async presentAlert(msj: string) {
    const alert = await this.alertController.create({
      header: 'exito!!',
      message: msj,
      buttons: ['OK'],
    });

    await alert.present();
  }

  async presentAlertMD(msj: string) {
    const alert = await this.alertController.create({
      header: 'Exito al modificar',
      message: msj,
      buttons: ['OK'],
    });

    await alert.present();
  }

  async mostrarAlerta(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Éxito',
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }

  async mostrarErrorAlert(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }

  async carritoBien(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Éxito',
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }

  async carritoMal(mensaje: string) {
    const alert = await this.alertController.create({
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }
  //ALMACENAMIENTO LOCAL

  async initStorage() {
    await this.storage.create();
  }


  async getUsuarioAutenticadoDesdeBD(id: any): Promise<Usuario | null> {
    return this.database.executeSql('SELECT * FROM usuario WHERE idUsuario = ?', [id]).then(res => {
      if (res.rows.length > 0) {
        return {
          idUsuario: res.rows.item(0).idUsuario,
          nombreU: res.rows.item(0).nombreU,
          apellidoU: res.rows.item(0).apellidoU,
          rutU: res.rows.item(0).rutU,
          correoU: res.rows.item(0).correoU,
          contrasenaU: res.rows.item(0).contrasenaU,
          idRol: res.rows.item(0).idRol,
          claveU: res.rows.item(0).claveU,
          respuestaU: res.rows.item(0).respuestaU,
          idVenta: res.rows.item(0).idVenta,
          fotoU: res.rows.item(0).fotoU,
          usuarioPregunta: res.rows.item(0).usuarioPregunta
        } as Usuario;
      } else {
        return null;
      }
    });
  }



  async buscarUsuarioPorCorreoYContrasena(correo: string, contrasena: string): Promise<Usuario | null> {
    return this.database.executeSql('SELECT * FROM usuario WHERE correoU = ? AND contrasenaU = ?', [correo, contrasena]).then(res => {
      if (res.rows.length > 0) {
        return {
          idUsuario: res.rows.item(0).idUsuario,
          nombreU: res.rows.item(0).nombreU,
          apellidoU: res.rows.item(0).apellidoU,
          correoU: res.rows.item(0).correoU,
          rutU: res.rows.item(0).rutU,
          idRol: res.rows.item(0).idRol,
          fotoU: res.rows.item(0).fotoU
        } as Usuario;
      } else {
        return null;
      }
    });
  }


  async buscarCorreo(correoU: string): Promise<Usuario | null> {
    return this.database.executeSql('select * from usuario where correoU = ?', [correoU]).then(res => {
      if (res.rows.length > 0) {
        return {
          idUsuario: res.rows.item(0).idUsuario,
          correoU: res.rows.item(0).correoU,
          respuestaU: res.rows.item(0).respuestaU,
          usuarioPregunta: res.rows.item(0).usuarioPregunta
        } as Usuario;
      } else {
        return null;
      }
    })
  }

  recuperarcontraE(correoU: any) {
    return this.database.executeSql('SELECT usuarioPregunta FROM usuario WHERE correoU = ?', [correoU]).then(res => {
      if (res.rows.length > 0) {
        // Devolver el primer usuario encontrado (suponiendo que sea único)
        return res.rows.item(0);
      } else {
        return null; // No se encontró ningún usuario
      }
    }).catch(e => {
      this.presentAlert("Error en validar usuario: " + e);
      return false;
    }
    )
  }

  async verificarCorreoExistente(correo: string): Promise<boolean> {
    return this.database.executeSql('SELECT COUNT(*) AS count FROM usuario WHERE correoU = ?', [correo]).then(res => {
      return res.rows.item(0).count > 0;
    });
  }


  async getUsuarioAutenticado(): Promise<Usuario | null> {
    return this.storage.get('usuarioRegistrado');
  }

  actualizarRol(idUsuario: any, nuevoRol: number) {
    return this.database.executeSql('UPDATE usuario SET rol = ? WHERE idUsuario = ?', [nuevoRol, idUsuario])
      .then(res => {
        console.log('Rol actualizado correctamente');
        return res;
      })
      .catch(error => {
        console.error('Error al actualizar el rol:', error);
        throw error;
      });
  }

}
