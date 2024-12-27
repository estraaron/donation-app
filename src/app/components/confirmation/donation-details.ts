export interface DonationDetails {
  type: string;
  amount: number;
  currency: string;
  interval?: string; // Opcional
  trial_period_days?: number; // Opcional
}
