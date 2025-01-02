import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Stripe, StripeCardElement, loadStripe } from '@stripe/stripe-js';
import { selectClientSecret } from '../../../state/payment-methods/payment.selectors';
import { PaymentEventService } from '../../../services/payment-event.service';

@Component({
  selector: 'app-payment-card',
  standalone: true,
  imports: [],
  templateUrl: './payment-card.component.html',
  styleUrl: './payment-card.component.scss'
})
export class PaymentCardComponent implements OnInit {
  @ViewChild('cardElement') cardElement!: ElementRef;

  stripe: Stripe | null = null;
  card: StripeCardElement | null = null;
  clientSecret: string | null = null;

  constructor(private store: Store,
    private paymentEventService: PaymentEventService,
  ) {}

  async ngOnInit() {
    // Inicializar Stripe y Elements
    this.stripe = await loadStripe('pk_test_51OcYzaCpxR0GNX12axWTlzV1yBfZkfpnmFXhcNnF8FsEwipD0J8Anp47FU9ZkuCwZ7gq2YQCjnB4Iy6lK92ZQbBj007PWvDlLx'); // Cambia por tu public key de Stripe

    const elements = this.stripe?.elements();
    if (elements) {
      this.card = elements.create('card', { style: this.getCardStyles() });
      this.card.mount(this.cardElement.nativeElement);
    } else {
      console.error('No se pudo inicializar Stripe Elements');
    }

    // Suscribirse al estado para obtener el client_secret
    this.store.select(selectClientSecret).subscribe((clientSecret) => {
      // console.log("clientSecret desde selectClientSecret:", clientSecret); // Log para verificar el valor obtenido
      this.clientSecret = clientSecret;
    });
  }

  getCardStyles() {
    return {
      base: {
        fontSize: '16px',
        color: '#32325d',
        '::placeholder': { color: '#aab7c4' },
      },
      invalid: {
        color: '#fa755a',
      },
    };
  }

  async confirmPayment() {
    if (!this.stripe || !this.card || !this.clientSecret) {
      // console.error('Faltan configuraciones para confirmar el pago', {
      //   stripe: this.stripe,
      //   card: this.card,
      //   cSecret: this.clientSecret
      // });
      return;
    }

    const result = await this.stripe.confirmCardPayment(this.clientSecret, {
      payment_method: { card: this.card },
    });

    if (result.error) {
      console.error('Error al confirmar el pago:', result.error.message);
    } else if (result.paymentIntent) {
      // console.log('Pago confirmado:', result.paymentIntent);
      this.paymentEventService.confirmPayment(); // Emitir el evento global
    }
  }
}
