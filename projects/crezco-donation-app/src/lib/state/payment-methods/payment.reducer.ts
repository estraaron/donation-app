import { Action, createReducer, on } from '@ngrx/store';
import * as PaymentActions from './payment.actions';

export interface PaymentState {
  setUpIntentId: string | null;
  clientSecret: string | null;
  paymentMethod: any | null;
  error: string | null;
}

const initialState: PaymentState = {
  setUpIntentId: null,
  clientSecret: null,
  paymentMethod: null,
  error: null,
};

export const paymentReducer = createReducer(
  initialState,
  on(PaymentActions.confirmSetupIntentSuccess, (state, { clientSecret,setUpIntentId }) => ({
    ...state,
    clientSecret,
    setUpIntentId
  })),
  on(PaymentActions.confirmSetupIntentFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(PaymentActions.createPaymentIntentSuccess, (state, { clientSecret }) => ({
    ...state,
    clientSecret,
  })),
  on(PaymentActions.createSetupIntentSuccess, (state, { clientSecret, setUpIntentId  }) => ({
    ...state,
    clientSecret,
    setUpIntentId
  })),
  on(PaymentActions.createSetupIntentFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(PaymentActions.createPaymentIntentSuccess, (state, { clientSecret }) => ({
    ...state,
    clientSecret,
  })),
  on(PaymentActions.createPaymentIntentFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);
