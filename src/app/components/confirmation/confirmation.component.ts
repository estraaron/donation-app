import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
// import { confirmDonation } from '../../state/donation/donation.actions';
@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [],
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.scss'
})
export class ConfirmationComponent {
  donorName!: string;
  donorEmail!: string;
  donationType!: string;
  donationAmount!: number;

  constructor(private store: Store<any>) {
    this.store.select('donor').subscribe((state) => {
      this.donorName = state.name;
      this.donorEmail = state.email;
    });

    // this.store.select('donation').subscribe((state) => {
    //   this.donationType = state.type;
    //   this.donationAmount = state.amount;
    // });
  }

  confirm() {
    // this.store.dispatch(confirmDonation());
  }
}
