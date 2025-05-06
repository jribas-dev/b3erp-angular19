import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UserPreCheckComponent } from './pages/user-pre-check/user-pre-check.component';
import { AuthUserResetPasswordComponent } from './pages/auth-user-reset-password/auth-user-reset-password.component';
import { AuthUserLoginComponent } from './pages/auth-user-login/auth-user-login.component';
import { UserPreCreateComponent } from './pages/user-pre-create/user-pre-create.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'B3Erp - WebApp',
  },
  {
    path: 'auth/login',
    component: AuthUserLoginComponent,
    title: 'Acesso Sistema - B3Erp',
  },
  {
    path: 'auth/reset-password',
    component: AuthUserResetPasswordComponent,
    title: 'Recuperar Senha - B3Erp',
  },
  {
    path: 'user-pre',
    component: UserPreCheckComponent,
    title: 'Pré Cadastro de Usuário - B3Erp',
  },
  {
    path: 'user-pre/create',
    component: UserPreCreateComponent,
    title: 'Concluir Cadastro de Usuário - B3Erp',
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
