import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from;
  import { SetDisabledStateOption } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class BaseDatosService {

  //Variable para manipular la conexión a la BD
  public database!: SQLiteObject;
  //variables para la creación de tablas
  tablaCategoria: string = "CREATE TABLE IF NOT EXISTS categoria (idCategoria integer primary key autoincrement,  nombreCategoria VARCHAR(25) not null);";

  tablaRol: string = "CREATE TABLE IF NOT EXISTS rol (idRol integer primary key autoincrement,  nombreRol VARCHAR(25) not null);";

  tablaTienda: string = "CREATE TABLE IF NOT EXISTS tienda (idTienda integer primary key autoincrement,  nombreTienda VARCHAR(25) not null);";

  tablaPregunta: string = "CREATE TABLE IF NOT EXISTS pregunta (idPregunta integer primary key autoincrement,  nombrePregunta VARCHAR(25) not null);";

  tablaProducto: string = "CREATE TABLE IF NOT EXISTS producto (codProducto integer primary key autoincrement, nombrePregunta VARCHAR(25) not null, descProducto VARCHAR(100) not null, precioProducto integer not null, stockPropducto integer not null, fotooooo, FOREIGN KEY (idCategoria) REFERENCES categoria(idCategoria));";

  tablaDetalle: string = "CREATE TABLE IF NOT EXISTS detalle (idDetalle integer primary key autoincrement, cantidadProducto integer not null, subtotalD integer not null, FOREIGN KEY (idProducto) REFERENCES producto(idProducto));";
  
  tablaVenta: string = "CREATE TABLE IF NOT EXISTS venta (idVenta integer primary key autoincrement, totalV integer not null, carritoV VARCHAR(25) not null, fechaV VARCHAR(25) not null , FOREIGN KEY (idDetalle) REFERENCES detalle(idDetalle));";
  
  tablaUsuario: string = "CREATE TABLE IF NOT EXISTS usuario (idUsuario integer primary key autoincrement, nombreU VARCHAR(25) not null, apellidoU VARCHAR(25) not null, rutU VARCHAR(13) not null, correoU VARCHAR(25) not null, contrasena VARCHAR(15) not null, FOREIGN KEY (idRol) REFERENCES rol(idRol), FOREIGN KEY (idPregunta) REFERENCES pregunta(idPregunta), FOREIGN KEY (idVenta) REFERENCES venta(idVenta));";
  constructor() { }
}
