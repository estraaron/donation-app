import { createSelector, createFeatureSelector } from '@ngrx/store';
import { PaymentState } from './payment.reducer';

// Selector base para el estado `payment`
export const selectPaymentState = (state: any) => {
  console.log('Estado global recibido en selectPaymentState:', state);
  return state.payment;
};

// Selector para obtener el `clientSecret`
export const selectClientSecret = createSelector(
  selectPaymentState,
  (state: PaymentState) => {
    console.log('Estado de payment en selectClientSecret:', state);
    return state.clientSecret;
  }
);
