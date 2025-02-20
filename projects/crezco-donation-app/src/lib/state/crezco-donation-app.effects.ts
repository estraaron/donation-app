import { DonationEffects } from "./donation/donation.effects";
import { DonorEffects } from "./donor/donor.effects";
import { PaymentEffects } from "./payment-methods/payment.effects";

export const crezcoDonationAppEffects = [
  DonorEffects,
  DonationEffects,
  PaymentEffects,
];
