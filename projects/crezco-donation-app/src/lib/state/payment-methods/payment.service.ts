import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StripeService {
  private stripeBaseUrl = 'https://api.stripe.com/v1';
  private stripeApiKey = 'sk_test_51OcYzaCpxR0GNX12BWo7Pt0YmnMwDTFAUhoiWH5VHyrh07pjurhdaauGpqMLJJYItaH6ouRe8tWry00VmRJHYceI00XyYIs3tV'; // Cambia por tu clave secreta
  stripeHeaders = {
    Authorization: `Bearer ${this.stripeApiKey}`,
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  constructor(private http: HttpClient) {}

  confirmSetupIntent(setUpIntentId: string, payment_methodId: any): Observable<{ id: string, client_secret: string }> {
    const body = new HttpParams()
    .set('payment_method', payment_methodId);

  return this.http.post<{ id: string, client_secret: string }>(
    `${this.stripeBaseUrl}/setup_intents/${setUpIntentId}/confirm`,
    body, // Pasar el cuerpo como string codificado
    {
      headers: this.stripeHeaders,
    }
  );
}

  createSetupIntent(customerId: string): Observable<{ id: string, client_secret: string }> {
      const body = new URLSearchParams({
        customer: customerId,
        'automatic_payment_methods[enabled]': 'true',
        'automatic_payment_methods[allow_redirects]': 'never',
      }).toString();
    return this.http.post<{ id: string, client_secret: string }>(`${this.stripeBaseUrl}/setup_intents`, body.toString(), {
      headers: this.stripeHeaders,
    });
  }

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
      headers: this.stripeHeaders
    });
  }
}
