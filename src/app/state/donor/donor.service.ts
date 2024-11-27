import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root', // Para standalone components, este es suficiente
})
export class DonorService {
  private stripeBaseUrl = 'https://api.stripe.com/v1'; // URL base de Stripe
  private stripeApiKey = 'sk_test_51OcYzaCpxR0GNX12BWo7Pt0YmnMwDTFAUhoiWH5VHyrh07pjurhdaauGpqMLJJYItaH6ouRe8tWry00VmRJHYceI00XyYIs3tV'; // Reemplaza con tu clave de Stripe

  constructor(private http: HttpClient) {}

  createCustomer(data: { name: string; email: string }): Observable<any> {
    // Convertir los datos a x-www-form-urlencoded
    const body = this.toUrlEncoded(data);
    return this.http.post(
      `${this.stripeBaseUrl}/customers`,
      body,
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
    const body = this.toUrlEncoded(data);
    return this.http.post(
      `${this.stripeBaseUrl}/customers/${customerId}`,
      body,
      this.getHeaders()
    );
  }

  private getHeaders() {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.stripeApiKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    };
  }

  private toUrlEncoded(obj: any): string {
    return Object.keys(obj)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
      .join('&');
  }
}
