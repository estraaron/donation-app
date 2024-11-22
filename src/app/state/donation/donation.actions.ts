import { createAction, props } from '@ngrx/store';

// export const updateDonationDetails = createAction(
//   '[Donation] Update Donation Details',
//   props<{ type: string; amount: number }>()
// );

export const updateDonationDetailsSuccess = createAction(
  '[Donation] Update Donation Details Success'
);

export const updateDonationDetailsFailure = createAction(
  '[Donation] Update Donation Details Failure',
  props<{ error: any }>()
);

// export const confirmDonation = createAction(
//   '[Donation] Confirm Donation',
//   props<{ donorId: string; amount: number; type: string }>()
// );

export const confirmDonationSuccess = createAction(
  '[Donation] Confirm Donation Success',
  props<{ confirmationDetails: any }>()
);

export const confirmDonationFailure = createAction(
  '[Donation] Confirm Donation Failure',
  props<{ error: any }>()
);
