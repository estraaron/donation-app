import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { createPrice, updatePrice } from '../../state/donation/donation.actions';

@Component({
  selector: 'app-donation-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './donation-details.component.html',
  styleUrls: ['./donation-details.component.scss'],
})
export class DonationDetailsComponent implements OnInit, OnChanges {
  @Input() donationId: string | null = null;
  @Input() initialValues: Partial<{
    type: string;
    amount: number; // Centavos
    currency: string;
    interval: string;
  }> = {};
  @Output() donationSaved = new EventEmitter<void>();

  donationForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.applyInitialValues();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['initialValues'] && !changes['initialValues'].firstChange) {
      this.applyInitialValues();
    }
  }

  private initializeForm(): void {
    this.donationForm = this.fb.group({
      type: ['one_time', Validators.required],
      amount: [200, [Validators.required, Validators.min(1), Validators.max(1000)]], // Dólares
      currency: ['usd', Validators.required],
    });
  }

  private applyInitialValues(): void {
    const { type = 'one_time', amount = 200, currency = 'usd', interval } = this.initialValues;

    const amountInDollars = amount ? amount / 100 : 200;

    this.donationForm.patchValue({ type, amount: amountInDollars, currency });

    // Manejar el control dinámico de `interval`
    this.manageIntervalControl(type, interval);

    // Forzar actualización inmediata de la vista
    this.cdr.detectChanges();
  }


  private manageIntervalControl(type: string, interval?: string): void {
    if (type === 'recurring') {
      if (!this.donationForm.contains('interval')) {
        this.donationForm.addControl('interval', this.fb.control(interval || 'week', Validators.required));
      } else {
        this.donationForm.patchValue({ interval: interval || 'week' });
      }
    } else if (this.donationForm.contains('interval')) {
      this.donationForm.removeControl('interval');
    }
  }

  setType(type: string): void {
    this.donationForm.patchValue({ type });
    this.manageIntervalControl(type);

    // Actualización explícita de la vista
    this.cdr.detectChanges();
  }

  setCurrency(currency: string): void {
    this.donationForm.patchValue({ currency });
  }

  setInterval(interval: string): void {
    this.donationForm.patchValue({ interval });
  }

  updateSlider(event: Event, isManualInput: boolean = false): void {
    const value = parseInt((event.target as HTMLInputElement).value, 10);
    if (isManualInput && value >= 1 && value <= 1000) {
      this.donationForm.patchValue({ amount: value });
    } else if (!isManualInput) {
      this.donationForm.patchValue({ amount: value });
    }
  }

  calculateThumbPosition(): number {
    const amount = this.donationForm.get('amount')?.value || 1;
    return ((amount - 1) / (1000 - 1)) * 100;
  }

  onSubmit(): void {
    if (this.donationForm.valid) {
      const { type, amount, currency, interval } = this.donationForm.value;

      const amountInCents = amount * 100;

      const data: any = {
        unit_amount: amountInCents,
        currency,
        product_data: { name: type === 'one_time' ? 'Donación Única' : 'Donación Recurrente' },
        nickname: type === 'one_time' ? 'Donación Única' : 'Donación Recurrente',
      };

      if (type === 'recurring') {
        data['recurring[interval]'] = interval;
      }

      if (this.donationId) {
        this.store.dispatch(updatePrice({ ...data, priceId: this.donationId }));
      } else {
        this.store.dispatch(createPrice(data));
      }

      this.donationSaved.emit();
    }
  }
}
