import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StripeService {
  private stripeBaseUrl = 'https://api.stripe.com/v1';
  private stripeApiKey = 'sk_test_51OcYzaCpxR0GNX12BWo7Pt0YmnMwDTFAUhoiWH5VHyrh07pjurhdaauGpqMLJJYItaH6ouRe8tWry00VmRJHYceI00XyYIs3tV'; // Cambia por tu clave secreta

  constructor(private http: HttpClient) {}

  // Crear PaymentIntent
  createPaymentIntent(amount: number, currency: string, customer: string): Observable<any> {
    const body = new URLSearchParams({
      amount: amount.toString(),
      currency,
      customer,
      'automatic_payment_methods[enabled]': 'true',
      'automatic_payment_methods[allow_redirects]': 'never',
    }).toString();

    return this.http.post(`${this.stripeBaseUrl}/payment_intents`, body.toString(), {
      headers: {
        Authorization: `Bearer ${this.stripeApiKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  }
}
