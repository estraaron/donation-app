import { createAction, props } from '@ngrx/store';

// subscription
export const confirmSetupIntent = createAction(
  '[Payment] Confirm SetupIntent',
  props<{ setUpIntentId: string, payment_methodId: any }>()
);

export const confirmSetupIntentSuccess = createAction(
  '[Payment] Confirm SetupIntent Success',
  props<{ clientSecret: string, setUpIntentId: string }>()
);

export const confirmSetupIntentFailure = createAction(
  '[Payment] Confirm SetupIntent Failure',
  props<{ error: any }>()
);

export const createSetupIntent = createAction(
  '[Payment] Create createSetupIntent',
  props<{ customer: string }>()
);

export const createSetupIntentSuccess = createAction(
  '[Payment] Create createSetupIntent Success',
  props<{ clientSecret: string, setUpIntentId: string }>()
);

export const createSetupIntentFailure = createAction(
  '[Payment] Create createSetupIntent Failure',
  props<{ error: any }>()
);

// one time donacion
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
