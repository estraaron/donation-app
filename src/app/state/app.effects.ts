import { DonationEffects } from "./donation/donation.effects";
import { DonorEffects } from "./donor/donor.effects";
import { PaymentEffects } from "./payment-methods/payment.effects";

export const appEffects = [
  DonorEffects,
  DonationEffects,
  PaymentEffects,
];
