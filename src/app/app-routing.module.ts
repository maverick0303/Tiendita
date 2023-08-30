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
    loadChildren: () => import('./pages/inicio/inicio-sesion/inicio-sesion.module').then( m => m.InicioSesionPageModule)
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
    path: 'ag4',
    loadChildren: () => import('./pages/productos/ag4/ag4.module').then( m => m.Ag4PageModule)
  },
  {
    path: 'ag5',
    loadChildren: () => import('./pages/productos/ag5/ag5.module').then( m => m.Ag5PageModule)
  },
  {
    path: 'ai1',
    loadChildren: () => import('./pages/productos/ai1/ai1.module').then( m => m.Ai1PageModule)
  },
  {
    path: 'ai4',
    loadChildren: () => import('./pages/productos/ai4/ai4.module').then( m => m.Ai4PageModule)
  },

  {
    path: 'ai6',
    loadChildren: () => import('./pages/productos/ai6/ai6.module').then( m => m.Ai6PageModule)
  },
  {
    path: 'rd2',
    loadChildren: () => import('./pages/productos/rd2/rd2.module').then( m => m.Rd2PageModule)
  },
  {
    path: 'rd5',
    loadChildren: () => import('./pages/productos/rd5/rd5.module').then( m => m.Rd5PageModule)
  },
  {
    path: 'rd6',
    loadChildren: () => import('./pages/productos/rd6/rd6.module').then( m => m.Rd6PageModule)
  },
  {
    path: 'r3',
    loadChildren: () => import('./pages/productos/r3/r3.module').then( m => m.R3PageModule)
  },
  {
    path: 'r4',
    loadChildren: () => import('./pages/productos/r4/r4.module').then( m => m.R4PageModule)
  },
  {
    path: 'r5',
    loadChildren: () => import('./pages/productos/r5/r5.module').then( m => m.R5PageModule)
  },
  {
    path: 'rs1',
    loadChildren: () => import('./pages/productos/rs1/rs1.module').then( m => m.Rs1PageModule)
  },

  {
    path: 'rs3',
    loadChildren: () => import('./pages/productos/rs3/rs3.module').then( m => m.Rs3PageModule)
  },

  {
    path: 'rs5',
    loadChildren: () => import('./pages/productos/rs5/rs5.module').then( m => m.Rs5PageModule)
  },
  {
    path: 'historial',
    loadChildren: () => import('./pages/Shop/historial/historial.module').then( m => m.HistorialPageModule)
  },
  {
    path: '**',
    loadChildren: () => import('./pages/notfound/notfound.module').then( m => m.NotfoundPageModule)
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
