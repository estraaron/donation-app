import { ApplicationConfig, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { crezcoDonationAppReducers } from './state/crezco-donation-app.reducer';
import { crezcoDonationAppEffects } from './state/crezco-donation-app.effects';

export function provideDonationAppConfig(): ApplicationConfig {
  return {
    providers: [
      provideHttpClient(withInterceptorsFromDi()),
      provideZoneChangeDetection({ eventCoalescing: true }),
      provideStore(crezcoDonationAppReducers),
      provideEffects(crezcoDonationAppEffects),
      provideStoreDevtools({
        maxAge: 25,
        logOnly: !isDevMode(),
        autoPause: true,
        trace: false,
        traceLimit: 75,
        connectInZone: true,
      })
    ],
  };
}
