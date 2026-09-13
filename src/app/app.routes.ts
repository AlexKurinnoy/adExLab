import { Routes } from '@angular/router';
import { MainPage } from './main-page/main-page';

export const routes: Routes = [
  {
    path: ':lang',
    children: [
      {
        path: '',
        component: MainPage,
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'uk',
  },
];
