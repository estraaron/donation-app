import { ActionReducerMap } from '@ngrx/store';
import { donorReducer, DonorState } from './donor/donor.reducer';
import { donationReducer, DonationState } from './donation/donation.reducer';
import { paymentReducer, PaymentState } from './payment-methods/payment.reducer';

export interface AppState {
  donor: DonorState;
  donation: DonationState;
  payment: PaymentState,
}

export const reducers: ActionReducerMap<AppState> = {
  donor: donorReducer,
  donation: donationReducer,
  payment: paymentReducer,
};
