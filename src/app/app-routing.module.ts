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
    loadChildren: () => import('./pages/inicio-sesion/inicio-sesion.module').then( m => m.InicioSesionPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'carrito',
    loadChildren: () => import('./pages/carrito/carrito.module').then( m => m.CarritoPageModule)
  },
  {
    path: 'tienda',
    loadChildren: () => import('./pages/tienda/tienda.module').then( m => m.TiendaPageModule)
  },
  {
    path: 'articulo1',
    loadChildren: () => import('./pages/articulo1/articulo1.module').then( m => m.Articulo1PageModule)
  },
  {
    path: 'datos-personales',
    loadChildren: () => import('./pages/datos-personales/datos-personales.module').then( m => m.DatosPersonalesPageModule)
  },
  {
    path: 'recuperar-clave',
    loadChildren: () => import('./pages/recuperar-clave/recuperar-clave.module').then( m => m.RecuperarClavePageModule)
  },
  {
    path: 'menu-admin',
    loadChildren: () => import('./pages/menu-admin/menu-admin.module').then( m => m.MenuAdminPageModule)
  },
  {
    path: 'reloj-ana',
    loadChildren: () => import('./pages/reloj-ana/reloj-ana.module').then( m => m.RelojAnaPageModule)
  },

  {
    path: 'productoadmin',
    loadChildren: () => import('./pages/productoadmin/productoadmin.module').then( m => m.ProductoadminPageModule)
  },
  {
    path: 'agregar-p-admin',
    loadChildren: () => import('./pages/agregar-p-admin/agregar-p-admin.module').then( m => m.AgregarPAdminPageModule)
  },
  {
    path: 'editar-p-admin',
    loadChildren: () => import('./pages/editar-p-admin/editar-p-admin.module').then( m => m.EditarPAdminPageModule)
  },
  {
    path: 'relojdig',
    loadChildren: () => import('./pages/relojdig/relojdig.module').then( m => m.RelojdigPageModule)
  },
  {
    path: 'relojsma',
    loadChildren: () => import('./pages/relojsma/relojsma.module').then( m => m.RelojsmaPageModule)
  },
  {
    path: 'audiina',
    loadChildren: () => import('./pages/audiina/audiina.module').then( m => m.AudiinaPageModule)
  },
  {
    path: 'audigamer',
    loadChildren: () => import('./pages/audigamer/audigamer.module').then( m => m.AudigamerPageModule)
  },






];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
