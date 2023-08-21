import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'inicio-sesion',
    loadChildren: () => import('./inicio/inicio-sesion/inicio-sesion.module').then( m => m.InicioSesionPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./inicio/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'recuperar-contrasena',
    loadChildren: () => import('./inicio/recuperar-contrasena/recuperar-contrasena.module').then( m => m.RecuperarContrasenaPageModule)
  },
  {
    path: 'articulo1',
    loadChildren: () => import('./articulos/articulo1/articulo1.module').then( m => m.Articulo1PageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./tienda/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'datos-personales',
    loadChildren: () => import('./usuario/datos-personales/datos-personales.module').then( m => m.DatosPersonalesPageModule)
  },  {
    path: 'carrito',
    loadChildren: () => import('./tienda/carrito/carrito.module').then( m => m.CarritoPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
