import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: ':lang',
    children: [
      {
        path: '',
        loadComponent: () => import('./main-page/main-page').then((m) => m.MainPage),
      },
      {
        path: 'services',
        loadComponent: () => import('./services-page/services-page').then((m) => m.ServicesPage),
      },
      {
        path: 'contact',
        loadComponent: () => import('./contact/contact').then((m) => m.ContactComponent),
      },
    ],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'uk',
  },

  {
    path: '**',
    redirectTo: 'uk',
  },
];
