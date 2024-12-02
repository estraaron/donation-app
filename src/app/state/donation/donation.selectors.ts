import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DonationState } from './donation.reducer';

export const selectDonationState = createFeatureSelector<DonationState>('donation');

export const selectPrice = createSelector(
  selectDonationState,
  (state) => state.price
);

export const selectPriceDetails = createSelector(
  selectDonationState,
  (state) => {
    const price = state.price;

    return {
      type: price?.type ?? '',
      amount: price?.unit_amount ?? 0,
      currency: price?.currency ?? '',
      interval: price?.recurring?.interval ?? ''
    };
  }
);

export const selectLoading = createSelector(
  selectDonationState,
  (state) => state.loading
);

export const selectError = createSelector(
  selectDonationState,
  (state) => state.error
);
