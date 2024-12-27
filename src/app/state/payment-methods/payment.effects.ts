import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { defer, of } from 'rxjs';
import { catchError, map, exhaustMap, switchMap } from 'rxjs/operators';
import { StripeService } from './payment.service';
import { createPaymentIntent, createPaymentIntentFailure, createPaymentIntentSuccess } from './payment.actions';

@Injectable()
export class PaymentEffects {
  constructor(private actions$: Actions, private stripeService: StripeService) {}

  // Efecto: Crear PaymentIntent
createPaymentIntent$ = createEffect(() =>
  defer(() =>
    this.actions$.pipe(
      ofType(createPaymentIntent),
      exhaustMap(({ amount, currency, customer }) => {
        console.log("Efecto createPaymentIntent llamado con:", { amount, currency, customer }); // Log de parámetros
        return this.stripeService.createPaymentIntent(amount, currency, customer).pipe(
          map((response) => {
            console.log("Respuesta de Stripe:", response); // Log para verificar la respuesta de Stripe
            return createPaymentIntentSuccess({
              clientSecret: response.client_secret,
            });
          }),
          catchError((error) => {
            console.error("Error en createPaymentIntent:", error); // Log para errores
            return of(createPaymentIntentFailure({ error }));
          })
        );
      })
    )
  )
);
}
