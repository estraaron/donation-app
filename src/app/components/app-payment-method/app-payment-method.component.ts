import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { combineLatest, Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { selectCustomerId, selectDonorDetails } from '../../state/donor/donor.selectors';
import { loadStripe } from '@stripe/stripe-js';
import { Stripe, StripeElements, StripeCardElement } from '@stripe/stripe-js';
// import { selectPaymentState, selectSetupIntentStatus } from '../../state/payment-methods/payment.selectors';
import { createPaymentIntent } from '../../state/payment-methods/payment.actions';
import { PaymentCardComponent } from "./payment-card/payment-card.component";
import { Subscription } from 'rxjs';
import { selectPriceDetails } from '../../state/donation/donation.selectors';

@Component({
  selector: 'app-payment-method',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PaymentCardComponent],
  templateUrl: './app-payment-method.component.html',
  styleUrls: ['./app-payment-method.component.scss'],
})
export class PaymentMethodComponent implements OnInit, OnDestroy {
  donor: any;
  donation: any;
  private subscriptions = new Subscription();

  constructor(private fb: FormBuilder, private store: Store) {
  }

  ngOnInit() {
    this.subscriptions.add(
      combineLatest([
        this.store.select(selectDonorDetails),
        this.store.select(selectPriceDetails)
      ])
        .pipe(
          filter(([donor, donation]) =>
            !!donor?.customerId && !!donor?.name && !!donor?.email &&
            !!donation?.amount && !!donation?.currency
          ) // Verifica que los datos clave estén disponibles
        )
        .subscribe(([donor, donation]) => {
          this.donor = donor;
          this.donation = donation;
          console.log('Datos listos para crear Payment Intent:', this.donor, this.donation);
          this.createPaymentIntent();
        })
      );
  }

  createPaymentIntent() {
    console.log(this.donor, this.donation)
    if (this.donor && this.donation) {
    const amount = this.donation.amount * 100; // Monto en centavos, ejemplo: 50.00 USD
    const currency = this.donation.currency;
    const customer = this.donor.customerId; // Aquí deberías usar el ID del donante guardado

    this.store.dispatch(
      createPaymentIntent({ amount, currency, customer })
    );
    } else console.log('datos de donacion pendientes')
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
