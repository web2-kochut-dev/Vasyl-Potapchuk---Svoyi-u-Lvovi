import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
    title: 'Свій майстер — сервіс допомоги по дому у Львові: сантехнік, електрик, вантажники',
  },
  {
    path: 'dyakuyemo',
    loadComponent: () => import('./pages/thanks/thanks').then((m) => m.Thanks),
    title: 'Дякуємо за заявку — Свій майстер',
  },
  { path: '**', redirectTo: '' },
];
