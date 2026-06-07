import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
    title: 'Свої у Львові — допоміжна служба: сантехнік, електрик, вантажники',
  },
  {
    path: 'dyakuyemo',
    loadComponent: () => import('./pages/thanks/thanks').then((m) => m.Thanks),
    title: 'Дякуємо за заявку — Свої у Львові',
  },
  { path: '**', redirectTo: '' },
];
