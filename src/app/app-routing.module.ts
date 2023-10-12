import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'tienda',
    pathMatch: 'full'
  },
  {
    path: 'inicio-sesion',
    loadChildren: () => import('./pages/inicio/inicio-sesion/inicio-sesion.module').then( m => m.InicioSesionPageModule)
  },
  {
    path: 'm-datos',
    loadChildren: () => import('./pages/m-datos/m-datos.module').then( m => m.MDatosPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/inicio/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'carrito',
    loadChildren: () => import('./pages/Shop/carrito/carrito.module').then( m => m.CarritoPageModule)
  },
  {
    path: 'tienda',
    loadChildren: () => import('./pages/Shop/tienda/tienda.module').then( m => m.TiendaPageModule)
  },
  {
    path: 'datos-personales',
    loadChildren: () => import('./pages/inicio/datos-personales/datos-personales.module').then( m => m.DatosPersonalesPageModule)
  },
  {
    path: 'recuperar-clave',
    loadChildren: () => import('./pages/inicio/recuperar-clave/recuperar-clave.module').then( m => m.RecuperarClavePageModule)
  },
  {
    path: 'reloj-ana',
    loadChildren: () => import('./pages/categoria/reloj-ana/reloj-ana.module').then( m => m.RelojAnaPageModule)
  },
  {
    path: 'agregar-p-admin',
    loadChildren: () => import('./pages/admin/agregar-p-admin/agregar-p-admin.module').then( m => m.AgregarPAdminPageModule)
  },
  {
    path: 'editar-p-admin',
    loadChildren: () => import('./pages/admin/editar-p-admin/editar-p-admin.module').then( m => m.EditarPAdminPageModule)
  },
  {
    path: 'relojdig',
    loadChildren: () => import('./pages/categoria/relojdig/relojdig.module').then( m => m.RelojdigPageModule)
  },
  {
    path: 'relojsma',
    loadChildren: () => import('./pages/categoria/relojsma/relojsma.module').then( m => m.RelojsmaPageModule)
  },
  {
    path: 'audiina',
    loadChildren: () => import('./pages/categoria/audiina/audiina.module').then( m => m.AudiinaPageModule)
  },
  {
    path: 'audigamer',
    loadChildren: () => import('./pages/categoria/audigamer/audigamer.module').then( m => m.AudigamerPageModule)
  },
  {
    path: 'ag3',
    loadChildren: () => import('./pages/productos/ag3/ag3.module').then( m => m.Ag3PageModule)
  },
  {
    path: 'historial',
    loadChildren: () => import('./pages/Shop/historial/historial.module').then( m => m.HistorialPageModule)
  },
  {
    path: 'lista-usuario',
    loadChildren: () => import('./pages/admin/lista-usuario/lista-usuario.module').then( m => m.ListaUsuarioPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
