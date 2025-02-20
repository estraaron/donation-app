import { createSelector, createFeatureSelector } from '@ngrx/store';
import { DonorState } from './donor.reducer';

export const selectDonorFeature = createFeatureSelector<DonorState>('donor');

export const selectCustomerId = createSelector(
  selectDonorFeature,
  (state) => state.customerId
);

export const selectDonorDetails = createSelector(
  selectDonorFeature,
  (state) => ({
    customerId: state.customerId,
    name: state.name,
    email: state.email,
  })
);
