import { createAction, props } from '@ngrx/store';

export const createPaymentIntent = createAction(
  '[Payment] Create PaymentIntent',
  props<{ amount: number; currency: string; customer: string }>()
);

export const createPaymentIntentSuccess = createAction(
  '[Payment] Create PaymentIntent Success',
  props<{ clientSecret: string }>()
);

export const createPaymentIntentFailure = createAction(
  '[Payment] Create PaymentIntent Failure',
  props<{ error: any }>()
);
