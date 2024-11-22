import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { createCustomer, createCustomerSuccess, createCustomerFailure, retrieveCustomer, retrieveCustomerSuccess, retrieveCustomerFailure, updateCustomer, updateCustomerSuccess, updateCustomerFailure } from './donor.actions';
import { catchError, map, exhaustMap, tap } from 'rxjs/operators';
import { defer, of } from 'rxjs';
import { DonorService } from './donor.service';

@Injectable()
export class DonorEffects {

  // Efecto para crear un nuevo cliente con defer y exhaustMap
  createCustomer$ = createEffect(() =>
    defer(() => this.actions$.pipe(
      ofType(createCustomer),
      tap(action => console.log('Action received:', action)),  // Log de la acción
      exhaustMap((action) =>
        this.donorService.createCustomer(action).pipe(
          map(customer => createCustomerSuccess({ customerId: customer.id })),
          catchError(error => of(createCustomerFailure({ error })))
        )
      )
    ))
  );

  // Efecto para recuperar un cliente existente con defer y exhaustMap
  retrieveCustomer$ = createEffect(() =>
    defer(() => this.actions$.pipe(
      ofType(retrieveCustomer),
      tap(action => console.log('Retrieving customer:', action)),  // Log de la acción
      exhaustMap((action) =>
        this.donorService.retrieveCustomer(action.customerId).pipe(
          map(customer => retrieveCustomerSuccess({ customerId: customer.id, name: customer.name, email: customer.email })),
          catchError(error => of(retrieveCustomerFailure({ error })))
        )
      )
    ))
  );

  // Efecto para actualizar la información del cliente con defer y exhaustMap
  updateCustomer$ = createEffect(() =>
    defer(() => this.actions$.pipe(
      ofType(updateCustomer),
      tap(action => console.log('Updating customer:', action)),  // Log de la acción
      exhaustMap((action) =>
        this.donorService.updateCustomer(action.customerId, { name: action.name, email: action.email }).pipe(
          map(() => updateCustomerSuccess({ customerId: action.customerId })),
          catchError(error => of(updateCustomerFailure({ error })))
        )
      )
    ))
  );

  constructor(
    private actions$: Actions,
    private donorService: DonorService
  ) {
    console.log('Actions observable:', this.actions$);  // Log en el constructor
  }
}
