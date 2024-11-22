import { Component, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
// import { updateDonationDetails } from '../../state/donor/donor.actions';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-donation-details',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './donation-details.component.html',
  styleUrl: './donation-details.component.scss'
})
export class DonationDetailsComponent {
  @Output() donationSaved = new EventEmitter<void>();

  type = 'one-time';
  amount = 0;

  constructor(private store: Store) {}

  onSubmit() {
    if (this.amount > 0) {
      // Simula guardar los detalles
      setTimeout(() => {
        this.donationSaved.emit();
      }, 1000); // Simula un retraso
    }
  }
}
