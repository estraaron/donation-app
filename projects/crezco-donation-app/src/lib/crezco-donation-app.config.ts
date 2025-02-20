import { EnvironmentProviders, isDevMode, provideZoneChangeDetection, makeEnvironmentProviders } from '@angular/core';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { crezcoDonationAppReducers } from './state/crezco-donation-app.reducer';
import { crezcoDonationAppEffects } from './state/crezco-donation-app.effects';

interface CrezcoDonationAppConfigOptions {
  enableStoreDevtools?: boolean; // Opcional, para habilitar devtools
  storeDevtoolsConfig?: any; // Opcional, para personalizar configuración de devtools
}

export function provideCrezcoDonationAppConfig(options: CrezcoDonationAppConfigOptions = {}): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideHttpClient(withInterceptorsFromDi()),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideStore(crezcoDonationAppReducers),
    provideEffects(crezcoDonationAppEffects),
    ...(options.enableStoreDevtools
      ? [provideStoreDevtools({
          maxAge: 25,
          logOnly: !isDevMode(),
          autoPause: true,
          trace: false,
          traceLimit: 75,
          connectInZone: true,
          ...options.storeDevtoolsConfig, // ✅ Permite personalizar los valores
        })]
      : [] // Si no se habilita, se mantiene vacío
    ),
  ]);
}
