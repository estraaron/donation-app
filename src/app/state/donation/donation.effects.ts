import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { catchError, map, exhaustMap, of, defer } from 'rxjs';
import * as DonationActions from './donation.actions';
import { DonationService } from './donation.service';

@Injectable()
export class DonationEffects {
  constructor(private actions$: Actions, private donationService: DonationService) {}

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
