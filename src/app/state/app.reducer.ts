import { ActionReducerMap } from '@ngrx/store';
import { donorReducer, DonorState } from './donor/donor.reducer';
import { donationReducer, DonationState } from './donation/donation.reducer';

export interface AppState {
  donor: DonorState;
  donation: DonationState;
}

export const reducers: ActionReducerMap<AppState> = {
  donor: donorReducer,
  donation: donationReducer,
};
