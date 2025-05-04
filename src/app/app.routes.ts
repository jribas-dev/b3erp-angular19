import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'B3Erp - WebApp',
  },
//   {
//     path: 'user-pre',
//     loadComponent: () =>
//       import('./components/auth/user-pre.component').then(
//         (m) => m.UserPreComponent
//       ),
//     title: 'Criar nova conta',
//   },
//   {
//     path: 'auth/login',
//     loadComponent: () =>
//       import('./components/auth/login.component').then((m) => m.LoginComponent),
//     title: 'Fazer login',
//   },
//   {
//     path: 'auth/reset-password',
//     loadComponent: () =>
//       import('./components/auth/reset-password.component').then(
//         (m) => m.ResetPasswordComponent
//       ),
//     title: 'Recuperar senha',
//   },
  {
    path: '**',
    redirectTo: '',
  },
];
