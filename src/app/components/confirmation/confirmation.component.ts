import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { confirmPayment } from '../../state/donation/donation.actions';
import { Stripe, StripeCardElement, StripeElements } from '@stripe/stripe-js';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { selectDonorDetails } from '../../state/donor/donor.selectors';
import { selectConfirmationDetails, selectPriceDetails } from '../../state/donation/donation.selectors';

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
})
export class ConfirmationComponent implements OnInit, OnDestroy {
  donor: any;
  donation: any;
  private subscriptions = new Subscription();
  private stripe: Stripe | null = null;
  private card: StripeCardElement | null = null;

  constructor(private store: Store) {}

  ngOnInit(): void {
    // Recuperar Resumen del Estado
    this.subscriptions.add(
      this.store.select(selectDonorDetails).subscribe((donor) => (this.donor = donor))
    );

    this.subscriptions.add(
      this.store.select(selectPriceDetails).subscribe((donation) => (this.donation = donation))
    );

    // Inicializar Stripe y Card Element
    this.initializeStripe();
  }

  private async initializeStripe(): Promise<void> {
    if (!this.stripe) {
      this.stripe = await (await import('@stripe/stripe-js')).loadStripe('pk_test_51OcYzaCpxR0GNX12axWTlzV1yBfZkfpnmFXhcNnF8FsEwipD0J8Anp47FU9ZkuCwZ7gq2YQCjnB4Iy6lK92ZQbBj007PWvDlLx');
    }

    const elements = this.stripe?.elements();
    if (elements) {
      this.card = elements.create('card');
      this.card.mount('#card-element');
    }
  }

  confirmDonation(): void {
    if (!this.stripe || !this.card) {
      console.error('Stripe o Card Element no están inicializados.');
      return;
    }

    // Crear el PaymentIntent y Confirmarlo
    const paymentIntentData = {
      amount: this.donation.amount * 100, // Conversión a centavos
      currency: this.donation.currency,
      customer: this.donor.customerId, // ID del Donante en Stripe
    };

    this.store.dispatch(confirmPayment({ paymentIntentData }));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.card?.unmount();
  }
}
