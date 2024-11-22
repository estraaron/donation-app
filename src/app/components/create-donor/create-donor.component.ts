import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { createCustomer, retrieveCustomer, updateCustomer } from '../../state/donor/donor.actions';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { selectCustomerId } from '../../state/donor/donor.selectors';

@Component({
  selector: 'app-create-donor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-donor.component.html',
  styleUrls: ['./create-donor.component.scss']
})
export class CreateDonorComponent implements OnInit {
  @Output() donorSaved = new EventEmitter<string>(); // Emisor del evento

  name = '';
  email = '';
  customerId: string | null = null;

  constructor(private store: Store) {}

  ngOnInit(): void {
    // Si hay un customerId, intenta recuperar la información.
    if (this.customerId) {
      this.store.dispatch(retrieveCustomer({ customerId: this.customerId }));
    }

    // Suscribirse al estado para capturar el customerId cuando se cree un cliente.
    this.store.select(selectCustomerId).subscribe((id) => {
      if (id) {
        console.log('ID del cliente recibido desde el estado:', id);
        this.onCustomerCreated(id);
      }
    });
  }

  onSubmit() {
    if (this.name && this.email) {
      if (this.customerId) {
        // Actualizar cliente en Stripe
        this.store.dispatch(updateCustomer({ customerId: this.customerId, name: this.name, email: this.email }));
      } else {
        // Crear nuevo cliente en Stripe
        this.store.dispatch(createCustomer({ name: this.name, email: this.email }));
      }
    }
  }

  // Emitir el evento cuando se cree el cliente.
  onCustomerCreated(customerId: string) {
    console.log('Evento emitido con ID del cliente:', customerId);
    this.donorSaved.emit(customerId);
  }
}
