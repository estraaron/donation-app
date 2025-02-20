import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { createCustomer, retrieveCustomer } from './state/donor/donor.actions';
import { selectDonorDetails } from './state/donor/donor.selectors';
import { CommonModule } from '@angular/common';
import { CreateDonorComponent } from "./components/create-donor/create-donor.component";
import { DonationDetailsComponent } from "./components/donation-details/donation-details.component";
import { ConfirmationComponent } from "./components/confirmation/confirmation.component";
import { Observable, Subscription } from 'rxjs';
import { selectDonationState, selectPrice, selectPriceDetails } from './state/donation/donation.selectors';
import { getPrice } from './state/donation/donation.actions';
import { PaymentMethodComponent } from "./components/app-payment-method/app-payment-method.component";
import { AppThankYouComponent } from "./components/app-thank-you/app-thank-you.component";
import { PaymentEventService } from './services/payment-event.service';


import { CrezcoDonationAppComponent } from 'crezco-donation-app'; // 📌 Importar el componente de la librería

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [CommonModule, CrezcoDonationAppComponent]
})
export class AppComponent {}
