import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { definePreset } from '@primeuix/themes';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

/**
 * Брендовий пресет: авторитетний темно-синій (navy) як primary.
 * Палітра узгоджена з дизайн-системою (UI/UX Pro Max — Trust & Authority).
 */
const BrandPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#eef3fc',
      100: '#d9e4f7',
      200: '#b6ccef',
      300: '#8aabe4',
      400: '#5b84d6',
      500: '#3a63c4',
      600: '#2b4ea8',
      700: '#234088',
      800: '#1e3a8a',
      900: '#1b3168',
      950: '#131f42',
    },
  },
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: BrandPreset,
        // Фіксуємо світлу тему (білий фон), щоб системна темна не перемикала вигляд.
        options: { darkModeSelector: '.app-force-dark' },
      },
    }),
  ],
};
