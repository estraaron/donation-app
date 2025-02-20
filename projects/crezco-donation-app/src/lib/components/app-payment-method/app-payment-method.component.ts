import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { createPaymentIntent, createSetupIntent } from '../../state/payment-methods/payment.actions';
import { PaymentCardComponent } from './payment-card/payment-card.component';
import { selectPriceDetails } from '../../state/donation/donation.selectors';
import { selectDonorDetails } from '../../state/donor/donor.selectors';

// Intervalos permitidos según la documentación de Stripe
const VALID_INTERVALS: string[] = ['day', 'week', 'month', 'year'];

// Tipos permitidos para `donation.type`
const VALID_TYPES: string[] = ['one_time', 'recurring'];

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

  constructor(private store: Store) {}

  ngOnInit() {
    this.subscriptions.add(
      combineLatest([
        this.store.select(selectDonorDetails),
        this.store.select(selectPriceDetails),
      ])
        .pipe(
          filter(([donor, donation]) =>
            !!donor?.customerId &&
            !!donor?.name &&
            !!donor?.email &&
            !!donation?.amount &&
            !!donation?.currency &&
            VALID_TYPES.includes(donation?.type) && // Validación de tipo
            (donation.type !== 'recurring' || VALID_INTERVALS.includes(donation?.interval)) // Validación de intervalo si es recurrente
          )
        )
        .subscribe(([donor, donation]) => {
          this.donor = donor;
          this.donation = donation;
          // console.log('Datos listos para crear Intent:', this.donor, this.donation);

          console.log(`crea cs tipo: ${donation.type}`);
          this.getClientSecret(donation.type);
        })
    );
  }

  getClientSecret(type: 'one_time' | 'recurring') {
    console.log(this.donor, this.donation);
    if (this.donor && this.donation) {
      const amount = this.donation.amount * 100; // Monto en centavos, ejemplo: 50.00 USD
      const currency = this.donation.currency;
      const customer = this.donor.customerId; // ID del donante guardado

      if (type === 'one_time') {
        // console.log('intetna crear One time')
       this.store.dispatch(createPaymentIntent({ amount, currency, customer }));
      } else if (type === 'recurring') {
        // console.log('intetna crear recurring')
        this.store.dispatch(createSetupIntent({ customer }));
      }
    } else {
      console.log('datos de donacion pendientes');
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
