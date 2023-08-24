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
  },  {
    path: 'ag1',
    loadChildren: () => import('./pages/ag1/ag1.module').then( m => m.Ag1PageModule)
  },
  {
    path: 'ag2',
    loadChildren: () => import('./pages/ag2/ag2.module').then( m => m.Ag2PageModule)
  },
  {
    path: 'ag3',
    loadChildren: () => import('./pages/ag3/ag3.module').then( m => m.Ag3PageModule)
  },
  {
    path: 'ag4',
    loadChildren: () => import('./pages/ag4/ag4.module').then( m => m.Ag4PageModule)
  },
  {
    path: 'ag5',
    loadChildren: () => import('./pages/ag5/ag5.module').then( m => m.Ag5PageModule)
  },
  {
    path: 'ag6',
    loadChildren: () => import('./pages/ag6/ag6.module').then( m => m.Ag6PageModule)
  },
  {
    path: 'ai1',
    loadChildren: () => import('./pages/ai1/ai1.module').then( m => m.Ai1PageModule)
  },
  {
    path: 'ai2',
    loadChildren: () => import('./pages/ai2/ai2.module').then( m => m.Ai2PageModule)
  },
  {
    path: 'ai3',
    loadChildren: () => import('./pages/ai3/ai3.module').then( m => m.Ai3PageModule)
  },
  {
    path: 'ai4',
    loadChildren: () => import('./pages/ai4/ai4.module').then( m => m.Ai4PageModule)
  },
  {
    path: 'ai5',
    loadChildren: () => import('./pages/ai5/ai5.module').then( m => m.Ai5PageModule)
  },
  {
    path: 'ai6',
    loadChildren: () => import('./pages/ai6/ai6.module').then( m => m.Ai6PageModule)
  },
  {
    path: 'rd1',
    loadChildren: () => import('./pages/rd1/rd1.module').then( m => m.Rd1PageModule)
  },
  {
    path: 'rd2',
    loadChildren: () => import('./pages/rd2/rd2.module').then( m => m.Rd2PageModule)
  },
  {
    path: 'rd3',
    loadChildren: () => import('./pages/rd3/rd3.module').then( m => m.Rd3PageModule)
  },
  {
    path: 'rd4',
    loadChildren: () => import('./pages/rd4/rd4.module').then( m => m.Rd4PageModule)
  },
  {
    path: 'rd5',
    loadChildren: () => import('./pages/rd5/rd5.module').then( m => m.Rd5PageModule)
  },
  {
    path: 'rd6',
    loadChildren: () => import('./pages/rd6/rd6.module').then( m => m.Rd6PageModule)
  },
  {
    path: 'r1',
    loadChildren: () => import('./pages/r1/r1.module').then( m => m.R1PageModule)
  },
  {
    path: 'r2',
    loadChildren: () => import('./pages/r2/r2.module').then( m => m.R2PageModule)
  },
  {
    path: 'r3',
    loadChildren: () => import('./pages/r3/r3.module').then( m => m.R3PageModule)
  },
  {
    path: 'r4',
    loadChildren: () => import('./pages/r4/r4.module').then( m => m.R4PageModule)
  },
  {
    path: 'r5',
    loadChildren: () => import('./pages/r5/r5.module').then( m => m.R5PageModule)
  },
  {
    path: 'r6',
    loadChildren: () => import('./pages/r6/r6.module').then( m => m.R6PageModule)
  },
  {
    path: 'rs1',
    loadChildren: () => import('./pages/rs1/rs1.module').then( m => m.Rs1PageModule)
  },
  {
    path: 'rs2',
    loadChildren: () => import('./pages/rs2/rs2.module').then( m => m.Rs2PageModule)
  },
  {
    path: 'rs3',
    loadChildren: () => import('./pages/rs3/rs3.module').then( m => m.Rs3PageModule)
  },
  {
    path: 'rs4',
    loadChildren: () => import('./pages/rs4/rs4.module').then( m => m.Rs4PageModule)
  },
  {
    path: 'rs5',
    loadChildren: () => import('./pages/rs5/rs5.module').then( m => m.Rs5PageModule)
  },
  {
    path: 'rs6',
    loadChildren: () => import('./pages/rs6/rs6.module').then( m => m.Rs6PageModule)
  },







];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
