import { ActionReducerMap } from '@ngrx/store';
import { donorReducer, DonorState } from './donor/donor.reducer';

export interface AppState {
  donor: DonorState;
}

export const reducers: ActionReducerMap<AppState> = {
  donor: donorReducer,
};
