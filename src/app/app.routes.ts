import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { loginGuard } from './core/guards/login.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then((m) => m.LoginPage),
    canActivate: [loginGuard]
  },
  {
    path: 'tabs',
    loadComponent: () => import('./tabs/tabs.page').then((m) => m.TabsPage),
    canActivate: [authGuard],
    children: [
      {
        path: 'home',
        loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'donasi',
        loadComponent: () => import('./pages/donasi/donasi.page').then((m) => m.DonasiPage),
      },
      {
        path: 'feed',
        loadComponent: () => import('./pages/feed/feed.page').then((m) => m.FeedPage),
      },
      {
        path: 'notifikasi',
        loadComponent: () => import('./pages/notifikasi/notifikasi.page').then((m) => m.NotifikasiPage),
      },
      {
        path: 'profil',
        loadComponent: () => import('./pages/profil/profil.page').then((m) => m.ProfilPage),
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'home',
    redirectTo: 'tabs/home',
    pathMatch: 'full',
  },
];
