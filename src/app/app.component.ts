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

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [CommonModule, CreateDonorComponent, DonationDetailsComponent, ConfirmationComponent]
})
export class AppComponent implements OnInit {
  currentStep = 1;
  donorId: string | null = null;
  donorDetails$: Observable<{ name: string; email: string }>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store
  ) {
    this.donorDetails$ = this.store.select(selectDonorDetails);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.currentStep = +params['step'] || 1;
      this.donorId = params['donorId'] || null;

      if (this.donorId) {
        // Recuperar datos del donador desde la API si tenemos un ID
        this.store.dispatch(retrieveCustomer({ customerId: this.donorId }));
      }
    });
  }

  goToStep(step: number) {
    this.currentStep = step;
    this.updateQueryParams();
  }

  handleCreateCustomer(data: { name: string; email: string }): void {
    this.store.dispatch(createCustomer(data));
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

  private updateQueryParams(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        step: this.currentStep,
        donorId: this.donorId || null, // Asegurarse de no pasar `undefined`
      },
      queryParamsHandling: 'merge', // Mantener otros parámetros existentes
    });
  }
}
