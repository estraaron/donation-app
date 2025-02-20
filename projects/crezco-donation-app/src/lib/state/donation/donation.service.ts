import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DonationService {
  private readonly stripeBaseUrl = 'https://api.stripe.com/v1';
  private readonly apiKey = 'sk_test_51OcYzaCpxR0GNX12BWo7Pt0YmnMwDTFAUhoiWH5VHyrh07pjurhdaauGpqMLJJYItaH6ouRe8tWry00VmRJHYceI00XyYIs3tV'; // Configura tu clave secreta aquí.

  constructor(private http: HttpClient) {}

  confirmPaymentIntent(paymentIntentId: string): Observable<any> {
    return this.http.post(
      `${this.stripeBaseUrl}/payment_intents/${paymentIntentId}/confirm`,
      null, // No es necesario enviar un cuerpo
      this.getHttpOptions()
    );
  }

  /**
   * Crea un intent de pago (payment_intent) en Stripe.
   * @param paymentIntentData Información del pago.
   */
    createPaymentIntent(paymentIntentData: any): Observable<any> {
      const url = `${this.stripeBaseUrl}/payment_intents`;
      const headers = {
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      };

      // Configuración del cuerpo de la solicitud
      const body = new URLSearchParams({
        ...paymentIntentData,
        'automatic_payment_methods[enabled]': 'true',
        'automatic_payment_methods[allow_redirects]': 'never',
      }).toString();

      return this.http.post(url, body, { headers });
    }

  /**
   * Crea un precio (price) en Stripe.
   * @param data Información del precio.
   */
  createPrice(data: {
    unit_amount: number;
    currency: string;
    product_data: { name: string };
    recurring?: { interval: string };
  }): Observable<any> {
    return this.http.post(
      `${this.stripeBaseUrl}/prices`,
      this.toFormUrlEncoded(data),
      this.getHttpOptions()
    );
  }

  /**
   * Obtiene los detalles de un precio (price) por su ID.
   * @param priceId ID del precio.
   */
  getPrice(priceId: string): Observable<any> {
    return this.http.get(
      `${this.stripeBaseUrl}/prices/${priceId}`,
      this.getHttpOptions()
    );
  }

  /**
   * Actualiza un precio (price) existente en Stripe.
   * @param priceId ID del precio a actualizar.
   * @param data Información a actualizar.
   */
  updatePrice(priceId: string, data: { nickname?: string }): Observable<any> {
    return this.http.post(
      `${this.stripeBaseUrl}/prices/${priceId}`,
      this.toFormUrlEncoded(data),
      this.getHttpOptions()
    );
  }

  /**
   * Configura las opciones HTTP con el encabezado de autorización.
   */
  private getHttpOptions() {
    return {
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };
  }

    /**
   * Convierte un objeto a formato URL-encoded, manejando datos anidados.
   * @param data Objeto con los datos a convertir.
   */
    private toFormUrlEncoded(data: any, parentKey: string = ''): string {
      const entries = Object.entries(data).flatMap(([key, value]) => {
        // Si el valor es undefined o una función, lo omitimos
        if (value === undefined || typeof value === 'function') {
          return []; // Devolvemos un array vacío para omitir este valor
        }

        const fullKey = parentKey ? `${parentKey}[${key}]` : key;

        // Si 'value' es un objeto, lo procesamos recursivamente
        if (typeof value === 'object' && value !== null) {
          return this.toFormUrlEncoded(value, fullKey);
        }

        // Asegurarnos de que 'value' es un tipo adecuado (string | number | boolean)
        if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
          return `${encodeURIComponent(fullKey)}=${encodeURIComponent(value)}`;
        }

        // Si 'value' no es un tipo adecuado, lanzamos un error (opcional)
        throw new Error(`Invalid value type: ${typeof value}`);
      });

      return entries.join('&');
    }
}
