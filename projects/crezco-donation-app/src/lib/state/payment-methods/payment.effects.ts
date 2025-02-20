import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { defer, of } from 'rxjs';
import { catchError, map, exhaustMap, switchMap } from 'rxjs/operators';
import { StripeService } from './payment.service';
import { confirmSetupIntent, confirmSetupIntentFailure, confirmSetupIntentSuccess, createPaymentIntent, createPaymentIntentFailure, createPaymentIntentSuccess, createSetupIntent, createSetupIntentFailure, createSetupIntentSuccess } from './payment.actions';

@Injectable()
export class PaymentEffects {
  constructor(private actions$: Actions, private stripeService: StripeService) {}

  confirmSetupIntent$ = createEffect(() =>
    defer(() =>
      this.actions$.pipe(
        ofType(confirmSetupIntent),
        exhaustMap(({ setUpIntentId, payment_methodId }) => {
          // console.log("Efecto createPaymentIntent llamado con:", { amount, currency, customer }); // Log de parámetros
          return this.stripeService.confirmSetupIntent(setUpIntentId, payment_methodId).pipe(
            map((response) => {
              // console.log("Respuesta de Stripe:", response); // Log para verificar la respuesta de Stripe
              return confirmSetupIntentSuccess({
                clientSecret: response.client_secret,
                setUpIntentId: response.id
              });
            }),
            catchError((error) => {
              console.error("Error en createPaymentIntent:", error); // Log para errores
              return of(confirmSetupIntentFailure({ error }));
            })
          );
        })
      )
    )
  );

  createSetupIntent$ = createEffect(() =>
  defer(() =>
    this.actions$.pipe(
      ofType(createSetupIntent),
      exhaustMap(({ customer }) => {
        // console.log("Efecto createPaymentIntent llamado con:", { amount, currency, customer }); // Log de parámetros
        return this.stripeService.createSetupIntent(customer).pipe(
          map((response) => {
            // console.log("Respuesta de Stripe:", response); // Log para verificar la respuesta de Stripe
            return createSetupIntentSuccess({
              clientSecret: response.client_secret,
              setUpIntentId: response.id
            });
          }),
          catchError((error) => {
            console.error("Error en createPaymentIntent:", error); // Log para errores
            return of(createSetupIntentFailure({ error }));
          })
        );
      })
    )
  )
);

// Efecto: Crear PaymentIntent (onetime donation)
createPaymentIntent$ = createEffect(() =>
  defer(() =>
    this.actions$.pipe(
      ofType(createPaymentIntent),
      exhaustMap(({ amount, currency, customer }) => {
        // console.log("Efecto createPaymentIntent llamado con:", { amount, currency, customer }); // Log de parámetros
        return this.stripeService.createPaymentIntent(amount, currency, customer).pipe(
          map((response) => {
            // console.log("Respuesta de Stripe:", response); // Log para verificar la respuesta de Stripe
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
