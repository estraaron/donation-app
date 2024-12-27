import { createReducer, on } from '@ngrx/store';
import * as DonationActions from './donation.actions';
// import { updateSubscription } from './donation.actions';

export interface DonationState {
  price: any | null;
  subscriptionDetails: any | null;
  paymentIntent: any | null;
  loading: boolean;
  error: any | null;
}

export const initialState: DonationState = {
  price: null,
  subscriptionDetails: null,
  paymentIntent: null,
  loading: false,
  error: null,
};

export const donationReducer = createReducer(
  initialState,

  // on(updateSubscription, (state, action) => ({
  //   ...state,
  //   subscriptionDetails: {
  //     ...state.subscriptionDetails,
  //     ...action,
  //   },
  // })),
  on(DonationActions.finalizePayment, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(DonationActions.finalizePaymentSuccess, (state, { result }) => ({
    ...state,
    loading: false,
    paymentIntent: { ...state.paymentIntent, status: result.status },
  })),
  on(DonationActions.finalizePaymentFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // Cuando comienza la confirmación del pago, ponemos loading a true
  on(DonationActions.confirmPayment, (state) => ({
    ...state,
    loading: true,
    error: null, // Reseteamos errores
  })),

  // Cuando el pago es exitoso, actualizamos el estado con el paymentIntent y desactivamos loading
  on(DonationActions.confirmPaymentSuccess, (state, { paymentIntent }) => ({
    ...state,
    paymentIntent,
    loading: false,
    error: null, // No hay error si fue exitoso
  })),

  // Cuando hay un error en la confirmación, actualizamos el estado con el error y desactivamos loading
  on(DonationActions.confirmPaymentFailure, (state, { error }) => ({
    ...state,
    paymentIntent: null,
    loading: false,
    error,
  })),

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
