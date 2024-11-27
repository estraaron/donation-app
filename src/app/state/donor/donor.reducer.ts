import { createReducer, on } from '@ngrx/store';
import { createCustomer, createCustomerSuccess, retrieveCustomerSuccess, updateCustomerSuccess } from './donor.actions';

export interface DonorState {
  name: string;
  email: string;
  customerId: string | null;
}

export const initialState: DonorState = {
  name: '',
  email: '',
  customerId: null,
};

export const donorReducer = createReducer(
  initialState,
  on(createCustomer, (state, { name, email}) => ({
    ...state,
    name,
    email,
    customerId: state.customerId
  })),
  on(createCustomerSuccess, (state, { customerId, name, email }) => ({
    ...state,
    customerId,
    name,
    email,
  })),
  on(retrieveCustomerSuccess, (state, { customerId, name, email }) => ({
    ...state,
    customerId,
    name,
    email,
  })),
  on(updateCustomerSuccess, (state, { customerId, name, email }) => ({
    ...state,
    customerId,
    name,
    email,
  }))
);
