// src/app/state/donor/donor.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root', // Para standalone components, este es suficiente
})
export class DonorService {
  private stripeBaseUrl = 'https://api.stripe.com/v1'; // URL base de Stripe
  private stripeApiKey = 'sk_test_51OcYzaCpxR0GNX12BWo7Pt0YmnMwDTFAUhoiWH5VHyrh07pjurhdaauGpqMLJJYItaH6ouRe8tWry00VmRJHYceI00XyYIs3tV'; // Reemplaza con tu clave de Stripe

  constructor(private http: HttpClient) {}

  createCustomer(data: { name: string; email: string }): Observable<any> {
    return this.http.post(
      `${this.stripeBaseUrl}/customers`,
      data,
      this.getHeaders()
    );
  }

  retrieveCustomer(customerId: string): Observable<any> {
    return this.http.get(
      `${this.stripeBaseUrl}/customers/${customerId}`,
      this.getHeaders()
    );
  }

  updateCustomer(
    customerId: string,
    data: { name?: string; email?: string }
  ): Observable<any> {
    return this.http.post(
      `${this.stripeBaseUrl}/customers/${customerId}`,
      data,
      this.getHeaders()
    );
  }

  private getHeaders() {
    return {
      headers: {
        Authorization: `Bearer ${this.stripeApiKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };
  }
}
