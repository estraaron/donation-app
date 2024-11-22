import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { CreateDonorComponent } from './components/create-donor/create-donor.component';
import { DonationDetailsComponent } from './components/donation-details/donation-details.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { retrieveCustomer } from './state/donor/donor.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, CreateDonorComponent, DonationDetailsComponent, ConfirmationComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  currentStep = 1; // Paso inicial
  donorId: string | null = null;
  amount: number | null = null;
  type: string | null = null;
  steps = ['Crear Donador', 'Detalles de Donación', 'Confirmación'];

  private navigatingManually = false; // Bandera para navegación manual

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private cdr: ChangeDetectorRef // Inyecta ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (this.navigatingManually) {
        console.log('Ignorando actualización de queryParams debido a navegación manual.');
        return;
      }

      const step = +params['step'] || 1;
      const donorId = params['donorId'] || null;

      // Validación para evitar sobrescribir pasos erróneos
      if (step !== this.currentStep) {
        console.log(`Cambiando paso: ${this.currentStep} -> ${step}`);
        this.currentStep = step;
      }

      this.donorId = donorId;
      this.amount = params['amount'] ? +params['amount'] : null;
      this.type = params['type'] || null;

      if (this.donorId) {
        this.store.dispatch(retrieveCustomer({ customerId: this.donorId }));
      }

      this.cdr.detectChanges(); // Forzar detección de cambios después de modificar los parámetros
    });
  }

  goToStep(index: number) {
    if (index >= 1 && index <= this.steps.length) {
      this.updateStep(index);
    }
  }

  nextStep() {
    if (this.currentStep < this.steps.length) {
      this.updateStep(this.currentStep + 1);
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.updateStep(this.currentStep - 1);
    }
  }

  private updateStep(step: number) {
    if (step === this.currentStep) {
      console.log('El paso ya está en el estado actual:', step);
      return;
    }

    console.log(`Actualizando paso: ${this.currentStep} -> ${step}`);
    this.currentStep = step;

    // Forzar la actualización de la ruta después de cambiar el paso
    this.updateRoute(() => {
      console.log('Ruta actualizada correctamente para el paso:', step);
    });
  }

  private updateRoute(onComplete?: () => void) {
    const queryParams = {
      step: this.currentStep,
      donorId: this.donorId,
      amount: this.amount,
      type: this.type,
    };

    if (!this.donorId) {
      console.error('El Donor ID es obligatorio para actualizar la ruta.');
      return;
    }

    console.log('Actualizando ruta con parámetros:', queryParams);
    this.navigatingManually = true;

    this.router
      .navigate([], {
        relativeTo: this.route,
        queryParams,
        queryParamsHandling: 'merge',
      })
      .finally(() => {
        this.navigatingManually = false;
        if (onComplete) {
          onComplete();
        }
      });
  }

  saveDonorData(donorId: string) {
    this.donorId = donorId;
    this.updateStep(2);
  }

  saveDonationDetails(amount: number, type: string) {
    this.amount = amount;
    this.type = type;
    this.updateStep(3);
  }
}
