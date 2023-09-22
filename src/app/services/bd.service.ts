import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuario } from './usuario';
import { Pregunta } from './pregunta';
import { Detalle } from './detalle';
import { Producto } from './producto';

@Injectable({
  providedIn: 'root'
})
export class BdserviceService {

  //Variable para manipular la conexión a la BD
  public database!: SQLiteObject;

  //variables para la creación de tablas
  tablaCategoria: string = "CREATE TABLE IF NOT EXISTS categoria (idCategoria integer primary key autoincrement,  nombreCategoria VARCHAR(25) not null);";

  tablaRol: string = "CREATE TABLE IF NOT EXISTS rol (idRol integer primary key autoincrement,  nombreRol VARCHAR(25) not null);";

  tablaPregunta: string = "CREATE TABLE IF NOT EXISTS pregunta (idPregunta integer primary key autoincrement,  nombrePregunta VARCHAR(50) not null);";

  tablaProducto: string = "CREATE TABLE IF NOT EXISTS producto (idProducto integer primary key autoincrement, nombreProducto VARCHAR(25) not null, descripcion VARCHAR(100) not null, precioProducto integer not null, stockProducto integer not null, nombreCategoria varchar(50) not null, bloob not null, FOREIGN KEY (nombreCategoria) REFERENCES categoria(idCategoria));";

  tablaDetalle: string = "CREATE TABLE IF NOT EXISTS detalle (idDetalle integer primary key autoincrement, cantidadProducto integer not null, subtotalD integer not null,nombreProducto not null, FOREIGN KEY (nombreProducto) REFERENCES producto(idProducto));";

  tablaVenta: string = "CREATE TABLE IF NOT EXISTS venta (idVenta integer primary key autoincrement, totalV integer not null, carritoV VARCHAR(25) not null, fechaV VARCHAR(25) not null , idDetalle not null, FOREIGN KEY (idDetalle) REFERENCES detalle(idDetalle));";

  tablaUsuario: string = "CREATE TABLE IF NOT EXISTS usuario (idUsuario integer primary key autoincrement, nombreU VARCHAR(25) not null, apellidoU VARCHAR(25) not null, rutU VARCHAR(13) not null, correoU VARCHAR(25) not null, contrasenaU VARCHAR(15) not null, idRol not null, nombrePregunta not null, idVenta not null, FOREIGN KEY (idRol) REFERENCES rol(idRol), FOREIGN KEY (nombrePregunta) REFERENCES pregunta(idPregunta), FOREIGN KEY (idVenta) REFERENCES venta(idVenta));";
  
  //variables de insert en las tablas de registros iniciales
  //registros de usuario
  registroUsuario1a: string = "INSERT or IGNORE INTO usuario(idUsuario,nombreU,apellidoU,rutU,correoU,contrasenaU) VALUES (1,'Alfredo','Estay','211266813','alfr.estay@duocuc.cl','Alfredo123@');";
  registroUsuario2a: string = "INSERT or IGNORE INTO usuario(idUsuario,nombreU,apellidoU,rutU,correoU,contrasenaU) VALUES (2,'Maria','Yeguez','269374225','ma.yeguez@duocuc.cl','Maria123@');"; 

  //registros de preguntas
  registroPregunta1: string = "INSERT or IGNORE INTO pregunta(idPregunta, nombrePregunta) VALUES (1,'¿Cuál es el nombre de tu mascota?');";
  registroPregunta2: string = "INSERT or IGNORE INTO pregunta(idPregunta, nombrePregunta) VALUES (2,'¿Cuál es tu pelicula favorita?');";
  registroPregunta3: string = "INSERT or IGNORE INTO pregunta(idPregunta, nombrePregunta) VALUES (3,'¿Cuál es tu fruta favorita?');";
  //registros de productos

  producto1: string = "INSERT or IGNORE INTO producto(idProducto, nombreProducto,descripcion, precioProducto, stockProducto, nombreCategoria) VALUES (1,'Audifono gamer','Audifono gamer perfecto para juegos.', 10000, 53, audifono gamer, FALTA LA FOTO);";
  


  //variables Observables para las consultas en las tablas
  listaUsuario = new BehaviorSubject([]);
  listaDetalle = new BehaviorSubject([]);
  listaProducto = new BehaviorSubject([]);
  listaPregunta = new BehaviorSubject([]);

  //variable para manipulación del estatus de la BD
  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  //CONSTRUCTOR
  constructor(private alertController: AlertController,private sqlite: SQLite, private platform: Platform) {
    this.crearBD();
  }

  //funciones para subscribirme al observable
  dbState(){
    return this.isDBReady.asObservable();
  }

  fetchUsuario(): Observable<Usuario[]>{
    return this.listaUsuario.asObservable();
  }
  fetchProducto(): Observable<Producto[]>{
    return this.listaProducto.asObservable();
  }
  fetchPregunta(): Observable<Pregunta[]>{
    return this.listaPregunta.asObservable();
  }
  fetchDetalle(): Observable<Detalle[]>{
    return this.listaDetalle.asObservable();
  }

  buscarUsuario(){
    return this.database.executeSql('SELECT * FROM usuario',[]).then(res=>{
      //variable para almacenar la consulta
      let items: Usuario[] = [];
      //validar si existen registros
      if(res.rows.length > 0){
        //procedo a recorrer y guardar
        for(var i=0; i<res.rows.length; i++){
          //agrego los datos a mi variable
          items.push({
            idUsuario: res.rows.item(i).idUsuario,
            nombreU: res.rows.item(i).nombreU,
            apellidoU: res.rows.item(i).apellidoU,
            rutU:  res.rows.item(i).rutU,
            correoU: res.rows.item(i).correoU,
            claveU: res.rows.item(i).clave
          })
        }
      }
      //actualizar mi observable
      this.listaUsuario.next(items as any);

    })
  }

  buscarPregunta(){
    return this.database.executeSql('SELECT * FROM pregunta',[]).then(res=>{
      //variable para almacenar la consulta
      let items: Pregunta[] = [];
      //validar si existen registros
      if(res.rows.length > 0){
        //procedo a recorrer y guardar
        for(var i=0; i<res.rows.length; i++){
          //agrego los datos a mi variable
          items.push({
            idPregunta: res.rows.item(i).idPregunta,
            nombrePregunta: res.rows.item(i).nombrePregunta
          })
        }
      }
      //actualizar mi observable
      this.listaPregunta.next(items as any);

    }).catch(e=>{
      this.presentAlert("error en buscar pregunta: " + e);
  }) 
  }

  buscarProducto(){
    return this.database.executeSql('SELECT * FROM producto',[]).then(res=>{
      //variable para almacenar la consulta
      let items: Producto[] = [];
      //validar si existen registros
      if(res.rows.length > 0){
        //procedo a recorrer y guardar
        for(var i=0; i<res.rows.length; i++){
          //agrego los datos a mi variable
          items.push({
            idProducto: res.rows.item(i).idProducto,
            nombreProducto: res.rows.item(i).nombreProducto,
            descripcion:  res.rows.item(i).descripcion,
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

  buscarDetalle(){
    return this.database.executeSql('SELECT * FROM detalle',[]).then(res=>{
      //variable para almacenar la consulta
      let items: Detalle[] = [];
      //validar si existen registros
      if(res.rows.length > 0){
        //procedo a recorrer y guardar
        for(var i=0; i<res.rows.length; i++){
          //agrego los datos a mi variable
          items.push({
            idDetalle: res.rows.item(i).idDetalle,
            cantidad: res.rows.item(i).cantidad,
            subtotal: res.rows.item(i).subtotal,
            precio:  res.rows.item(i).precio,
            stock: res.rows.item(i).stock
          })
        }
      }
      //actualizar mi observable
      this.listaDetalle.next(items as any);

    })
  }

  //FUNCIONES PARA INSERTAR EN LAS TABLAS
  //INSERTAR
  insertarProducto(nombreProducto:any, descripcion:any, precio:any, stock:any, foto:any){
    return this.database.executeSql('INSERT INTO producto(nombreProducto,descripcion,precio,stock,foto) VALUES (?,?,?,?,?)',[nombreProducto,descripcion,precio,stock,foto]).then(res=>{
      this.buscarProducto();
    })
  }
  insertarPregunta(nombrePregunta:any){
    return this.database.executeSql('INSERT INTO pregunta(nombrePregunta) VALUES (?)',[nombrePregunta]).then(res=>{
      this.buscarPregunta();
    })
  }

  //ACTUALIZAR TABLAS
  actualizarProducto(idProducto:any, nombreProducto:any, descripcion:any, precio:any, stock:any, foto:any){
    return this.database.executeSql('UPDATE producto SET nombreProducto = ?, descripcion = ?, precio = ?, stock = ?, foto = ? WHERE idProducto = ?',[nombreProducto,descripcion,precio,stock,foto,idProducto]).then(res=>{
      this.buscarProducto();
    })
  }

  actualizarPregunta(idPregunta:any, nombrePregunta:any){
    return this.database.executeSql('UPDATE pregunta set nombrePregunta = ? where idPregunta = ?',[nombrePregunta, idPregunta]).then(res=>{
      this.buscarPregunta();
    })
  }

  //BORRAR ALGO DE LAS TABLAS
  eliminarProducto(idProducto:any){
    return this.database.executeSql('DELETE FROM producto WHERE idProducto = ?',[idProducto]).then(res=>{
      this.buscarProducto();
    })
  }

  eliminarPregunta(idPregunta:any){
    return this.database.executeSql('DELETE FROM producto WHERE idProducto = ?',[idPregunta]).then(res=>{
      this.buscarPregunta();
    })
  }
  
  
  //funcion para crear la BD
  crearBD() {
    //verificamos que la plataforma esta lista
    this.platform.ready().then(() => {
      //crear la BD
      this.sqlite.create({
        name: 'bdtiendita2.db',
        location: 'default'
      }).then((db: SQLiteObject)=>{
        //guardamos la conexión en mi variable global
        this.database = db;
        //llamar a la funcion que crea las tablas
        this.crearTablas();
      }).catch(e=> {
        //capturamos y mostramos el error en la creacion de la BD
        this.presentAlert("Error en Crear BD: " + e);
      })
    })
  }

  async crearTablas(){
    try{
      //ejecutar la creación de tablas
      await this.database.executeSql(this.tablaCategoria,[]);
      await this.database.executeSql(this.tablaRol,[]);
      await this.database.executeSql(this.tablaPregunta,[]);
      await this.database.executeSql(this.tablaProducto,[]);
      await this.database.executeSql(this.tablaDetalle,[]);
      await this.database.executeSql(this.tablaVenta,[]);
      await this.database.executeSql(this.tablaUsuario,[]);

      //ejecuto los registros
      //REGISTRO DE ADMINISTRADOR
      await this.database.executeSql(this.registroUsuario1a,[]);
      await this.database.executeSql(this.registroUsuario2a,[]);

      //REGISTRO DE PREGUNTAS
      await this.database.executeSql(this.registroPregunta1,[]);
      await this.database.executeSql(this.registroPregunta2,[]);
      await this.database.executeSql(this.registroPregunta3,[]);

      //REGISTRO DE PRODUCTOS


      //actualizar el estatus de la BD
      this.isDBReady.next(true);
      this.buscarUsuario();
      this.buscarProducto();
      this.buscarDetalle();
      this.buscarPregunta();
    }catch(e){
      //capturamos y mostramos el error en la creacion de las tablas
      this.presentAlert("Error en Crear Tablas: " + e);
    }
  }

  async presentAlert(msj:string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: msj,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
