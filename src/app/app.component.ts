import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { createCustomer, retrieveCustomer } from './state/donor/donor.actions';
import { selectDonorDetails } from './state/donor/donor.selectors';
import { CommonModule } from '@angular/common';
import { CreateDonorComponent } from "./components/create-donor/create-donor.component";
import { DonationDetailsComponent } from "./components/donation-details/donation-details.component";
import { ConfirmationComponent } from "./components/confirmation/confirmation.component";
import { Observable } from 'rxjs';
import { selectDonationState, selectPrice, selectPriceDetails } from './state/donation/donation.selectors';
import { getPrice } from './state/donation/donation.actions';
import { PaymentMethodComponent } from "./components/app-payment-method/app-payment-method.component";
import { AppThankYouComponent } from "./components/app-thank-you/app-thank-you.component";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [CommonModule, CreateDonorComponent, DonationDetailsComponent, ConfirmationComponent, PaymentMethodComponent, AppThankYouComponent]
})
export class AppComponent implements OnInit {
  currentStep = 1;
  donorId: string | null = null;
  donationId: string | null = null;
  donorDetails$: Observable<{ name: string; email: string }>;

  donationDetails$: Observable<Partial<{
    type: string;
    amount: number;
    currency: string;
    interval: string;
  }>>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store
  ) {
    this.donorDetails$ = this.store.select(selectDonorDetails);
    this.donationDetails$ = this.store.select(selectPriceDetails);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.currentStep = +params['step'] || 1;
      this.donorId = params['donorId'] || null;
      this.donationId = params['donationId'] || null;

      if (this.donorId) {
        // Recuperar datos del donador desde la API si tenemos un ID
        this.store.dispatch(retrieveCustomer({ customerId: this.donorId }));
      }

      if (this.donationId) {
        this.store.dispatch(getPrice({priceId: this.donationId}))
      }
    });
  }

  goToStep(step: number) {
    this.currentStep = step;
    this.updateQueryParams();
  }

  handleCustomerSaved(): void {
    if (!this.donorId) {
      // Obtener el ID del estado cuando se crea un nuevo donador
      this.store.select(selectDonorDetails).subscribe((details) => {
        if (details && details.customerId) {
          this.donorId = details.customerId;
          this.updateQueryParams(); // Actualiza la URL con el nuevo donorId
        }
      });
    }
    this.goToStep(2); // Avanzar al siguiente paso
  }

  handledonationSaved() {
    if (!this.donationId) {
      // Obtener el ID del estado cuando se crea un nuevo donador
      this.store.select(selectPrice).subscribe((price) => {
        if (price) {
          console.log(price, 'price data');
          this.donationId = price.id;
          this.updateQueryParams(); // Actualiza la URL con el nuevo donorId
        }
      });
    }
    this.goToStep(3); // Avanzar al siguiente paso
  }

  handleConfirmation() {
    // Lógica para redirigir o mostrar una página de agradecimiento
    console.log('Donación única confirmada. Redirigiendo...');
    alert('Gracias por tu donación. Hemos recibido tu apoyo.');
    // Aquí podrías redirigir, por ejemplo:
    // this.router.navigate(['/thank-you']);
  }

  handleRecurringFormSubmit(updatedDetails: any) {
    console.log('Detalles actualizados de donación recurrente:', updatedDetails);
    // Manejo adicional como actualizar el estado global, llamar a un servicio, etc.
  }

  private updateQueryParams(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        step: this.currentStep,
        donorId: this.donorId || null, // Asegurarse de no pasar `undefined`
        donationId: this.donationId || null,
      },
      queryParamsHandling: 'merge', // Mantener otros parámetros existentes
    });
  }
}
