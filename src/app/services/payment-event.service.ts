import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentEventService {
  private paymentConfirmedSource = new Subject<void>();

  // Observable para que otros componentes se suscriban
  paymentConfirmed$ = this.paymentConfirmedSource.asObservable();

  // Método para emitir el evento
  confirmPayment() {
    this.paymentConfirmedSource.next();
  }
}
