import { createAction, props } from '@ngrx/store';

export const createCustomer = createAction(
  '[Donor] Create Customer',
  props<{ name: string; email: string, }>()
);

export const createCustomerSuccess = createAction(
  '[Donor] Create Customer Success',
  props<{ customerId: string }>()
);

export const createCustomerFailure = createAction(
  '[Donor] Create Customer Failure',
  props<{ error: any }>()
);

export const retrieveCustomer = createAction(
  '[Donor] Retrieve Customer',
  props<{ customerId: string }>()
);

export const retrieveCustomerSuccess = createAction(
  '[Donor] Retrieve Customer Success',
  props<{ customerId: string, name: string, email: string }>()
);

export const retrieveCustomerFailure = createAction(
  '[Donor] Retrieve Customer Failure',
  props<{ error: any }>()
);

export const updateCustomer = createAction(
  '[Donor] Update Customer',
  props<{ customerId: string, name: string, email: string }>()
);

export const updateCustomerSuccess = createAction(
  '[Donor] Update Customer Success',
  props<{ customerId: string }>()
);

export const updateCustomerFailure = createAction(
  '[Donor] Update Customer Failure',
  props<{ error: any }>()
);
