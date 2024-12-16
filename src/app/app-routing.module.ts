import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';



const routes: Routes = [
  // Layout sin AppComponent
  {
    path: '',
    redirectTo: 'menu-inicio',
    pathMatch: 'full'
  },
  {
    path: 'menu-inicio',
    loadChildren: () => import('./menu-inicio/menu-inicio.module').then(m => m.MenuInicioPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login-register/login/login.module').then(m => m.LoginPageModule),
  },
  {
    path: 'register',
    loadChildren: () => import('./login-register/register/register.module').then(m => m.RegisterPageModule),
  },
  // Layout con AppComponent
  {
    path: '',
    component: AppComponent, // Aplica el AppComponent como layout
    children: [
      // {
      //   path: '',
      //   loadChildren: () => import('./page/tab-inicial/tab-inicial.module').then(m => m.TabInicialPageModule)
      // },
      {
        path: 'iniciar/:username',
        loadChildren: () => import('./page/iniciar/iniciar.module').then(m => m.IniciarPageModule)
      },
      {
        path: 'materias/:username',
        loadChildren: () => import('./page/materias/materias.module').then(m => m.MateriasPageModule)
      },
      {
        path: 'login',
        loadChildren: () => import('./login-register/login/login.module').then(m => m.LoginPageModule)
      },
      {
        path: 'qrcode',
        loadChildren: () => import('./page/qrcode/qrcode.module').then(m => m.QRcodePageModule)
      },
      {
        path: 'register',
        loadChildren: () => import('./login-register/register/register.module').then(m => m.RegisterPageModule)
      },
      {
        path: 'gestion-asignatura',
        loadChildren: () => import('./Building-Blocks/Materias/gestion-asignatura/gestion-asignatura.module').then(m => m.GestionAsignaturaPageModule)
      },
      {
        path: 'add-asignatura',
        loadChildren: () => import('./Building-Blocks/Materias/add-asignatura/add-asignatura.module').then(m => m.AddAsignaturaPageModule)
      },
      {
        path: 'detalle-asignatura',
        loadChildren: () => import('./Building-Blocks/Materias/detalle-asignatura/detalle-asignatura.module').then(m => m.DetalleAsignaturaPageModule)
      },
      {
        path: 'modif-asignatura',
        loadChildren: () => import('./Building-Blocks/Materias/modif-asignatura/modif-asignatura.module').then(m => m.ModifAsignaturaPageModule)
      },
      {
        path: 'add-horario',
        loadChildren: () => import('./Building-Blocks/Horario/add-horario/add-horario.module').then(m => m.AddHorarioPageModule)
      },
      {
        path: 'perfil/:id',
        loadChildren: () => import('./Auth/perfil/perfil.module').then(m => m.PerfilPageModule)
      },
      {
        path: 'tomar-materia/:id',
        loadChildren: () => import('./page/tomar-materia/tomar-materia.module').then(m => m.TomarMateriaPageModule)
      }
    ]
  },
  {
    path: 'modif-perfil/:id',
    loadChildren: () => import('./Auth/modif-perfil/modif-perfil.module').then( m => m.ModifPerfilPageModule)
  },
  {
    path: 'recover-password',
    loadChildren: () => import('./login-register/recover-password/recover-password.module').then( m => m.RecoverPasswordPageModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./login-register/reset-password/reset-password.module').then( m => m.ResetPasswordPageModule)
  },
  {
    path: 'mod-pass/:email',
    loadChildren: () => import('./login-register/mod-pass/mod-pass.module').then( m => m.ModPassPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
