import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuario } from './usuario';
import { Pregunta } from './pregunta';
import { Detalle } from './detalle';
import { Producto } from './producto';
import { Categoria } from './categoria';
import { Storage } from '@ionic/storage-angular';


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

  tablaProducto: string = "CREATE TABLE IF NOT EXISTS producto (idProducto integer primary key autoincrement, nombreProducto VARCHAR(25) not null, descripcion VARCHAR(100) not null, precio integer not null, stock integer not null, nombreCategoria varchar(50) not null, foto TEXT not null, FOREIGN KEY (nombreCategoria) REFERENCES categoria(idCategoria));";

  tablaDetalle: string = "CREATE TABLE IF NOT EXISTS detalle (idDetalle integer primary key autoincrement, cantidadProducto integer not null, subtotalD integer not null,idProducto integer not null,idVenta integer not null,  FOREIGN KEY (idProducto) REFERENCES producto(idProducto), FOREIGN KEY (idVenta) REFERENCES venta(idVenta));";

  tablaVenta: string = "CREATE TABLE IF NOT EXISTS venta (idVenta integer primary key autoincrement, totalV integer not null, carritoV VARCHAR(25) not null, fechaV VARCHAR(25) not null , idUsuario not null, FOREIGN KEY (idUsuario) REFERENCES usuario (idUsuario));";

  tablaUsuario: string = "CREATE TABLE IF NOT EXISTS usuario (idUsuario integer primary key autoincrement, nombreU VARCHAR(25) not null, apellidoU VARCHAR(25) not null, rutU VARCHAR(13) not null, correoU VARCHAR(25) not null, contrasenaU VARCHAR(15) not null, idRol not null, respuestaU VARCHAR(15) not null, nombrePregunta not null, idVenta not null, fotoU TEXT, FOREIGN KEY (idRol) REFERENCES rol(idRol), FOREIGN KEY (nombrePregunta) REFERENCES pregunta(idPregunta), FOREIGN KEY (idVenta) REFERENCES venta(idVenta));";

  //variables de insert en las tablas de registros iniciales
  registroUsuario: string = "INSERT or IGNORE INTO usuario(idUsuario,nombreU,apellidoU,rutU,correoU,contrasenaU,idRol,respuestaU,nombrePregunta,idVenta) VALUES (1,'Alfredo','Estay','211266813','alfr.estay@duocuc.cl','Alfredo123@',1,'respuesta1',3,3);";
  registroUsuarioPredeterminado1: string = "INSERT or IGNORE INTO usuario(idUsuario,nombreU,apellidoU,rutU,correoU,contrasenaU,idRol,respuestaU,nombrePregunta,idVenta) VALUES (2,'Admin','Admin','123456789','admin@gmail.com','Admin123@',2,'Respuesta1',1,1);";
  registroUsuarioPredeterminado2: string = "INSERT or IGNORE INTO usuario(idUsuario,nombreU,apellidoU,rutU,correoU,contrasenaU,idRol,respuestaU,nombrePregunta,idVenta) VALUES (3,'Usuario','Usuario','987654321','usuario@gmail.com','Usuario123@',1,'Respuesta2',2,2);";

  registroPregunta1: string = "INSERT or IGNORE INTO pregunta(idPregunta, nombrePregunta) VALUES (1,'¿Cuál es el nombre de tu mascota?');";
  registroPregunta2: string = "INSERT or IGNORE INTO pregunta(idPregunta, nombrePregunta) VALUES (2,'¿Cuál es tu pelicula favorita?');";
  registroPregunta3: string = "INSERT or IGNORE INTO pregunta(idPregunta, nombrePregunta) VALUES (3,'¿Cuál es tu fruta favorita?');";

  //registro de categoria
  registroCategoria1: string = "INSERT Or IGNORE into categoria(idCategoria, nombreCategoria) VALUES (1,'Reloj digital');";
  registroCategoria2: string = "INSERT Or IGNORE into categoria(idCategoria, nombreCategoria) VALUES (2,'Reloj analógico');";
  registroCategoria3: string = "INSERT Or IGNORE into categoria(idCategoria, nombreCategoria) VALUES (3,'Audifono bluetooth');";
  registroCategoria4: string = "INSERT Or IGNORE into categoria(idCategoria, nombreCategoria) VALUES (4,'Audifono gamer');";
  registroCategoria5: string = "INSERT Or IGNORE into categoria(idCategoria, nombreCategoria) VALUES (5,'Reloj smartwatch');";

  //variable de Productos:
  prod1: string = "INSERT or IGNORE into producto(idProducto,nombreProducto, descripcion, precio, stock, nombreCategoria, foto) VALUES (1,'Audífonos gamers rojos con negro', 'Auriculares gamer rojos con diseño llamativo y elegante, brindando sonido inmersivo y comodidad en sus oidos.', 50000, 10, 4, 'assets/AUDIFONOS GAMERS/ag3.webp');";
  prod2: string = "INSERT or IGNORE into producto(idProducto,nombreProducto, descripcion, precio, stock, nombreCategoria, foto) VALUES (2,'Audífonos gamers negro con naranja', 'Auriculares gamer en negro con toques anaranjados que ofrecen sonido envolvente, comodidad ergonómica y estilo llamativo', 75000, 7, 4, 'assets/AUDIFONOS GAMERS/ag4.jpeg');";
  prod3: string = "INSERT or IGNORE into producto(idProducto,nombreProducto, descripcion, precio, stock, nombreCategoria, foto) VALUES (3,'Audífonos gamers lila con blanco','Estos audífonos con diseño atractivo, audio inmersivo,comodidad asegurada,son perfectos para quienes buscan rendimiento y estilo en un solo paquete.',35000,10,4,'assets/AUDIFONOS GAMERS/ag5.jpeg');";
  //audifonos inalambricos:
  prod4: string = "INSERT or IGNORE into producto(idProducto,nombreProducto, descripcion, precio, stock, nombreCategoria, foto) VALUES (4,'Audífonos Bluetooth morados','Estos audifonos con tono morado,ofrecen conectividad sin cables con estilo.Perfectos para quienes buscan comodidad y libertad en su experiencia auditiva.',39990, 10,3,'assets/AUDIFONOS BLUTU/a1.jpg');";
  prod5: string = "INSERT or IGNORE into producto(idProducto,nombreProducto, descripcion, precio, stock, nombreCategoria, foto) VALUES (5,'Audífonos Bluetooth azules','Estos audífonos en tono azul,ofrecen conectividad inalámbrica con un toque de frescura. Ideales para quienes buscan comodidad y estilo en su experiencia auditiva sin necesidad de cables.',42000,6,3,'assets/AUDIFONOS BLUTU/a4.jpg');";
  prod6: string = "INSERT or IGNORE into producto(idProducto,nombreProducto, descripcion, precio, stock, nombreCategoria, foto) VALUES (6,'Audífonos Bluetooth verde','Estos audífonos, brindan conectividad inalámbrica con un toque de naturaleza. Perfectos para quienes desean comodidad y un estilo distintivo en sus dispositivos de audio.',269000,12,3,'assets/AUDIFONOS BLUTU/a6.jpg');";
  //relojes analogicos
  prod7: string = "INSERT or IGNORE into producto(idProducto,nombreProducto, descripcion, precio, stock, nombreCategoria, foto) VALUES (7,'Reloj Analógico Negro con azules','Este reloj negro con acentos en azul, une elegancia y modernidad. Perfecto para quienes buscan un estilo sofisticado con un toque de color audaz en su reloj de pulsera.',119000,12,2,'assets/RELOJES ANALOGO/r3.webp');";
  prod8: string = "INSERT or IGNORE into producto(idProducto,nombreProducto, descripcion, precio, stock, nombreCategoria, foto) VALUES (8,'Reloj Analógico negro fondo azul','Este reloj con esfera en tono negro y fondo azul, fusiona elegancia y un toque de originalidad. Ideal para aquellos que buscan un reloj clásico pero con un detalle único que resalta su estilo.',194990,8,2,'assets/RELOJES ANALOGO/r4.jpeg');";
  prod9: string = "INSERT or IGNORE into producto(idProducto,nombreProducto, descripcion, precio, stock, nombreCategoria, foto) VALUES (9,'Reloj Analógico amarillo con negro','Reloj analógico en amarillo con fondo negro, aporta un contraste audaz y llamativo. Perfecto para quienes quieran destacar con un toque de color vibrante en su muñeca, sin dejar de ser elegante.',289000,10,2,'assets/RELOJES ANALOGO/r5.jpg');";
  //relojes digitales
  prod10: string = "INSERT or IGNORE into producto(idProducto,nombreProducto, descripcion, precio, stock, nombreCategoria, foto) VALUES (10,'Reloj Digital negro con borde azul','Reloj digital en negro con borde azul, fusiona elegancia con un toque de estilo contemporáneo.',61990,5,1,'assets/digitales/rd2.jpeg');";
  prod11: string = "INSERT or IGNORE into producto(idProducto,nombreProducto, descripcion, precio, stock, nombreCategoria, foto) VALUES (11,'Reloj Digital negro','Reloj digital en negro, brinda una estética moderna y minimalista. Ideal para quienes buscan simplicidad y funcionalidad en la visualización de la hora, manteniendo un estilo elegante.',54000,11,1,'assets/digitales/rd5.jpg');";
  prod12: string = "INSERT or IGNORE into producto(idProducto,nombreProducto, descripcion, precio, stock, nombreCategoria, foto) VALUES (12,'Reloj Digital blanco','Reloj digital blanco, combina estilo y funcionalidad de manera moderna. Perfecto para quienes buscan un reloj que resalte con un toque de color y una pantalla clara.',194990,5,1,'assets/digitales/rd6.jpeg');";
  //relojes smartwatch
  prod13: string = "INSERT or IGNORE into producto(idProducto,nombreProducto, descripcion, precio, stock, nombreCategoria, foto) VALUES (13,'Reloj Smartwatch azul','Este Smartwatch es un reloj moderno con funciones inteligentes. Con pantalla táctil y conexión al teléfono, muestra notificaciones y rastrea la salud. Diseño atractivo y personalizable.',139990,8,5,'assets/SMARTWATCH/rs1.webp');";
  prod14: string = "INSERT or IGNORE into producto(idProducto,nombreProducto, descripcion, precio, stock, nombreCategoria, foto) VALUES (14,'Reloj smartwatch naranja','Este reloj combina estilo y tecnología, se enlaza con tu  teléfono para notificaciones y  seguimiento de salud. Su llamativo  color naranja y opciones de personalización  lo hace muy moderno.',240000,10,5,'assets/SMARTWATCH/rs2.jpeg');";
  prod15: string = "INSERT or IGNORE into producto(idProducto,nombreProducto, descripcion, precio, stock, nombreCategoria, foto) VALUES (15,'Reloj Smartwatch morado','Este reloj fusiona moda y funcionalidad, se conecta a tu teléfono para notificaciones y monitoreo de salud. Su color y sus opciones de personalización lo convierten en un reloj elegante y útil.',360000,12,5,'assets/SMARTWATCH/rs3.jpeg');";
  //variables Observables para las consultas en las tablas
  listaUsuario = new BehaviorSubject([]);
  listaDetalle = new BehaviorSubject([]);
  listaProducto = new BehaviorSubject([]);
  listaPregunta = new BehaviorSubject([]);
  listaCategoria = new BehaviorSubject([]);
  listaMostrarProducto = new BehaviorSubject([]);


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
  //carrito:
  insertarDetalle(idProducto: number, cantidadProducto: number, subtotalD: number, idVenta: any) {
    return this.database.executeSql('INSERT INTO detalle (idProducto, cantidadProducto, subtotalD,idVenta) VALUES (?, ?, ?,?)', [idProducto, cantidadProducto, subtotalD, idVenta])
      .then(res => {
        console.log('Producto insertado en detalle: ', idProducto);
      })
      .catch(error => {
        console.error('Error al insertar producto en detalle: ', error);
      });
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
            nombrePregunta: res.rows.item(i).nombrePregunta,
            idVenta: res.rows.item(i).idVenta,
            fotoU: res.rows.item(i).fotoU

          })
        }
      }
      //actualizar mi observable
      this.listaUsuario.next(items as any);

    })
  }

  mostrarCategoria(idCategoria: number) {
    return this.database.executeSql('SELECT * FROM producto WHERE nombreCategoria = ?', [idCategoria]).then(res => {
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
            foto: res.rows.item(i).foto
          })
        }
      }
      //actualizar mi observable
      this.listaProducto.next(items as any);

    })
  }

  buscarDetalle() {
    return this.database.executeSql('SELECT * FROM detalle', []).then(res => {
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
            subtotal: res.rows.item(i).subtotalD,
            precio: res.rows.item(i).precio,
            stock: res.rows.item(i).stock
          })
        }
      }
      //actualizar mi observable
      this.listaDetalle.next(items as any);

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

  insertarUsuario(nombreU: any, apellidoU: any, rutU: any, correoU: any, contrasenaU: any, idRol: any, respuestaU: any, nombrePregunta: any, idVenta: any, fotoU: any) {
    return this.database.executeSql('INSERT INTO usuario(nombreU,apellidoU ,rutU , correoU ,contrasenaU, idRol, respuestaU, nombrePregunta, idVenta, fotoU ) VALUES (?,?,?,?,?,?,?,?,?,?)', [nombreU, apellidoU, rutU, correoU, contrasenaU, idRol, respuestaU, nombrePregunta, idVenta, fotoU]).then(res => {
      this.buscarUsuario();
    })
  }
  actualizarUsuario(idUsuario: any, nombreU: any, apellidoU: any, rutU: any, correoU: any, fotoU: any) {
    console.log("Actualizando usuario:", idUsuario, nombreU, apellidoU, rutU, correoU, fotoU);

    return this.database.executeSql('UPDATE usuario SET nombreU = ?, apellidoU = ?, rutU = ?, correoU = ?, fotoU = ? WHERE idUsuario = ?', [nombreU, apellidoU, rutU, correoU, idUsuario, fotoU]).then(res => {
      console.log("Usuario actualizado:", res);
      this.buscarUsuario();
    });
  }

  eliminarUsuario(idUsuario: any) {
    return this.database.executeSql('DELETE FROM usuario WHERE idUsuario = ?', [idUsuario]).then(res => {
      this.buscarUsuario();
    })
  }

  //INSERTAR
  insertarProducto(nombreProducto: any, descripcion: any, precio: any, stock: any, foto: any, idCategoria: any) {
    return this.database.executeSql('INSERT INTO producto(nombreProducto, descripcion, precio, stock, foto, nombreCategoria) VALUES (?,?,?,?,?,?)', [nombreProducto, descripcion, precio, stock, foto, idCategoria]).then(res => {
      this.buscarProducto();
    });
  }


  //ACTUALIZAR TABLAS
  actualizarProducto(idProducto: any, nombreProducto: any, descripcion: any, precio: any, stock: any, foto: any, idCategoria: any) {
    return this.database.executeSql('UPDATE producto SET nombreProducto = ?, descripcion = ?, precio = ?, stock = ?, foto = ?, nombreCategoria = ?  WHERE idProducto = ?', [nombreProducto, descripcion, precio, stock, foto, idCategoria, idProducto]).then(res => {
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
        name: 'bdtiendita7.db',
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
      this.buscarDetalle();
      this.buscarPregunta();
      this.buscarCategoria();

    } catch (e) {
      //capturamos y mostramos el error en la creacion de las tablas
      this.presentAlert("Error en Crear Tablas: " + e);
    }
  }

  async presentAlert(msj: string) {
    const alert = await this.alertController.create({
      header: 'Error',
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
  //ALMACENAMIENTO LOCAL

  async initStorage() {
    await this.storage.create();
  }
  

  async getUsuarioAutenticadoDesdeBD(): Promise<Usuario | null> {
    const usuarioRegistrado = await this.getUsuarioAutenticado();
  
    if (usuarioRegistrado) {
      return this.database.executeSql('SELECT * FROM usuario WHERE idUsuario = ?', [usuarioRegistrado.idUsuario]).then(res => {
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
            nombrePregunta: res.rows.item(0).nombrePregunta,
            idVenta: res.rows.item(0).idVenta,
            fotoU: res.rows.item(0).fotoU
          } as Usuario;
        } else {
          return null;
        }
      });
    } else {
      return null;
    }
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
          idRol: res.rows.item(0).idRol
       } as Usuario;
      } else {
        return null;
      }
    });
  }

  // ...

buscarUsuarioPorId(idUsuario: number) {
  return this.database.executeSql('SELECT * FROM usuario WHERE idUsuario = ?', [idUsuario]).then(res => {
    if (res.rows.length > 0) {
      return {
        idUsuario: res.rows.item(0).idUsuario,
        nombreU: res.rows.item(0).nombreU,
        apellidoU: res.rows.item(0).apellidoU,
        rutU: res.rows.item(0).rutU,
        correoU: res.rows.item(0).correoU,
        claveU: res.rows.item(0).contrasenaU,
        idRol: res.rows.item(0).idRol,
        respuestaU: res.rows.item(0).respuestaU,
        nombrePregunta: res.rows.item(0).nombrePregunta,
        idVenta: res.rows.item(0).idVenta,
        fotoU: res.rows.item(0).fotoU
      } as Usuario;
    } else {
      return null;
    }
  });
}


  async cerrarSesion() {
    // Limpiar el almacenamiento local y restablecer el estado de autenticación
    await this.storage.remove('usuarioRegistrado');
    this.isDBReady.next(false);
  }

  async getUsuarioAutenticado(): Promise<Usuario | null> {
    return this.storage.get('usuarioRegistrado');
  }
}
