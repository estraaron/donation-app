import { ApplicationConfig, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import {provideStoreDevtools} from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { provideCrezcoDonationAppConfig } from 'crezco-donation-app';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideCrezcoDonationAppConfig({ enableStoreDevtools: true })
  ],

};

