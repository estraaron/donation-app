import { createAction, props } from '@ngrx/store';

// export const updateSubscription = createAction(
//   '[Donation] Update Subscription',
//   props<{ priceId: string; interval?: string; trial_period_days?: number }>()
// );

export const finalizePayment = createAction(
  '[Donation] Finalize Payment',
  props<{ paymentIntentId: string }>()
);

export const finalizePaymentSuccess = createAction(
  '[Donation] Finalize Payment Success',
  props<{ result: any }>()
);

export const finalizePaymentFailure = createAction(
  '[Donation] Finalize Payment Failure',
  props<{ error: any }>()
);

// Acción para iniciar el proceso de confirmación
export const confirmPayment = createAction(
  '[Donation] Confirm Payment',
  props<{ paymentIntentData: any }>()
);

export const confirmPaymentSuccess = createAction(
  '[Donation] Confirm Payment Success',
  props<{ paymentIntent: any }>()
);

export const confirmPaymentFailure = createAction(
  '[Donation] Confirm Payment Failure',
  props<{ error: any }>()
);

// Crear un precio
export const createPrice = createAction(
  '[Donation] Create Price',
  props<{
    unit_amount: number;
    currency: string;
    product_data: { name: string };
    recurring?: { interval: string };
  }>()
);

export const createPriceSuccess = createAction(
  '[Donation] Create Price Success',
  props<{ price: any }>()
);

export const createPriceFailure = createAction(
  '[Donation] Create Price Failure',
  props<{ error: any }>()
);

// Obtener un precio
export const getPrice = createAction(
  '[Donation] Get Price',
  props<{ priceId: string }>()
);

export const getPriceSuccess = createAction(
  '[Donation] Get Price Success',
  props<{ price: any }>()
);

export const getPriceFailure = createAction(
  '[Donation] Get Price Failure',
  props<{ error: any }>()
);

// Actualizar un precio
export const updatePrice = createAction(
  '[Donation] Update Price',
  props<{ priceId: string; data: { nickname?: string } }>()
);

export const updatePriceSuccess = createAction(
  '[Donation] Update Price Success',
  props<{ price: any }>()
);

export const updatePriceFailure = createAction(
  '[Donation] Update Price Failure',
  props<{ error: any }>()
);
