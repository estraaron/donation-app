import { createReducer, on } from '@ngrx/store';
import * as DonationActions from './donation.actions';

export interface DonationState {
  price: any | null;
  loading: boolean;
  error: any | null;
}

export const initialState: DonationState = {
  price: null,
  loading: false,
  error: null,
};

export const donationReducer = createReducer(
  initialState,

  // Crear un precio
  on(DonationActions.createPrice, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(DonationActions.createPriceSuccess, (state, { price }) => ({
    ...state,
    loading: false,
    price,
  })),
  on(DonationActions.createPriceFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Obtener un precio
  on(DonationActions.getPrice, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(DonationActions.getPriceSuccess, (state, { price }) => ({
    ...state,
    loading: false,
    price,
  })),
  on(DonationActions.getPriceFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Actualizar un precio
  on(DonationActions.updatePrice, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(DonationActions.updatePriceSuccess, (state, { price }) => ({
    ...state,
    loading: false,
    price,
  })),
  on(DonationActions.updatePriceFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
