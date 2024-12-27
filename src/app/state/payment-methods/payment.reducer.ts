import { Action, createReducer, on } from '@ngrx/store';
import * as PaymentActions from './payment.actions';

export interface PaymentState {
  clientSecret: string | null;
  paymentMethod: any | null;
  error: string | null;
}

const initialState: PaymentState = {
  clientSecret: null,
  paymentMethod: null,
  error: null,
};

export const paymentReducer = createReducer(
  initialState,
  on(PaymentActions.createPaymentIntentSuccess, (state, { clientSecret }) => ({
    ...state,
    clientSecret,
  })),
  // on(PaymentActions.savePaymentMethodSuccess, (state, { result }) => ({
  //   ...state,
  //   paymentMethod: result,
  //   error: null,
  // })),
  on(PaymentActions.createPaymentIntentFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);
