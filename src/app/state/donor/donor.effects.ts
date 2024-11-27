import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { createCustomer, createCustomerSuccess, createCustomerFailure, retrieveCustomer, retrieveCustomerSuccess, retrieveCustomerFailure, updateCustomer, updateCustomerSuccess, updateCustomerFailure } from './donor.actions';
import { catchError, map, exhaustMap, tap } from 'rxjs/operators';
import { defer, of } from 'rxjs';
import { DonorService } from './donor.service';

@Injectable()
export class DonorEffects {

  createCustomer$ = createEffect(() =>
    defer(() =>
      this.actions$.pipe(
        ofType(createCustomer),
        // Inspecciona los datos de la acción antes de enviarlos al servicio
        tap(action => console.log('Action received:', action)),
        exhaustMap(action =>
          this.donorService.createCustomer({ name: action.name, email: action.email }).pipe(
            // Inspecciona lo que se envía al servicio
            tap(requestBody => console.log('Request to Stripe:', { name: action.name, email: action.email })),
            // Inspecciona la respuesta devuelta por Stripe
            tap(response => console.log('Response from Stripe:', response)),
            map(customer => createCustomerSuccess({
              customerId: customer.id,
              name: customer.name,
              email: customer.email
            })),
            catchError(error => {
              // Inspecciona cualquier error devuelto por Stripe
              console.error('Error from Stripe:', error);
              return of(createCustomerFailure({ error }));
            })
          )
        )
      )
    )
  );

  // Efecto para recuperar un cliente existente con defer y exhaustMap
  retrieveCustomer$ = createEffect(() =>
    defer(() => this.actions$.pipe(
      ofType(retrieveCustomer),
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
      // tap(action => console.log('Updating customer:', action)),  // Log de la acción
      exhaustMap((action) =>
        this.donorService.updateCustomer(action.customerId, { name: action.name, email: action.email }).pipe(
          map((updatedCustomer) =>
            updateCustomerSuccess({
              customerId: updatedCustomer.id,
              name: updatedCustomer.name,
              email: updatedCustomer.email
            })),
          catchError(error => of(updateCustomerFailure({ error })))
        )
      )
    ))
  );

  constructor(
    private actions$: Actions,
    private donorService: DonorService
  ) {
    // console.log('Actions observable:', this.actions$);  // Log en el constructor
  }
}
