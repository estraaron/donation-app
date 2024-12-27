import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { catchError, map, exhaustMap, of, defer, tap } from 'rxjs';
import * as DonationActions from './donation.actions';
import { DonationService } from './donation.service';

@Injectable()
export class DonationEffects {
  constructor(private actions$: Actions, private donationService: DonationService) {}

  finalizePayment$ = createEffect(() =>
    defer(() =>
      this.actions$.pipe(
        ofType(DonationActions.finalizePayment),
        exhaustMap(({ paymentIntentId }) =>
          this.donationService.confirmPaymentIntent(paymentIntentId).pipe(
            map((result) =>
              DonationActions.finalizePaymentSuccess({ result })
            ),
            catchError((error) =>
              of(DonationActions.finalizePaymentFailure({ error }))
            )
          )
        )
      )
    )
  );

  createPaymentIntentSuccess$ = createEffect(() =>
    defer(() =>
      this.actions$.pipe(
        ofType(DonationActions.confirmPaymentSuccess),
        map(({ paymentIntent }) =>
          DonationActions.finalizePayment({ paymentIntentId: paymentIntent.id })
        )
      )
    )
  );

  createPaymentIntent$ = createEffect(() =>
    defer(() =>
      this.actions$.pipe(
        ofType(DonationActions.confirmPayment),
        // Inspecciona los datos de la acción antes de enviarlos al servicio
        tap(action => console.log('Action received:', action)),
        exhaustMap(({ paymentIntentData }) =>
          this.donationService.createPaymentIntent(paymentIntentData).pipe(
            map((paymentIntent) =>
              DonationActions.confirmPaymentSuccess({ paymentIntent })
            ),
            catchError((error) =>
              of(DonationActions.confirmPaymentFailure({ error }))
            )
          )
        )
      )
    )
  );

  createPrice$ = createEffect(() =>
    defer(() =>
      this.actions$.pipe(
        ofType(DonationActions.createPrice),
        exhaustMap(({ unit_amount, currency, product_data, recurring }) =>
          this.donationService.createPrice({ unit_amount, currency, product_data, recurring }).pipe(
            map((price) => DonationActions.createPriceSuccess({ price })),
            catchError((error) => of(DonationActions.createPriceFailure({ error })))
          )
        )
      )
    )
  );

  getPrice$ = createEffect(() =>
    defer(() =>
      this.actions$.pipe(
        ofType(DonationActions.getPrice),
        exhaustMap(({ priceId }) =>
          this.donationService.getPrice(priceId).pipe(
            map((price) => DonationActions.getPriceSuccess({ price })),
            catchError((error) => of(DonationActions.getPriceFailure({ error })))
          )
        )
      )
    )
  );

  updatePrice$ = createEffect(() =>
    defer(() =>
      this.actions$.pipe(
        ofType(DonationActions.updatePrice),
        exhaustMap(({ priceId, data }) =>
          this.donationService.updatePrice(priceId, data).pipe(
            map((price) => DonationActions.updatePriceSuccess({ price })),
            catchError((error) => of(DonationActions.updatePriceFailure({ error })))
          )
        )
      )
    )
  );
}
