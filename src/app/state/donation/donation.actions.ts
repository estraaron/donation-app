import { createAction, props } from '@ngrx/store';

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
