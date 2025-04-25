'use client';

import { RecipientField } from './components/recipient-field';
import { TokenPayoutFieldArray } from './components/token-payout-field-array';
import { PaymentSchedule } from './components/payment-schedule';
import { Separator } from '@hypha-platform/ui';

export const ProposeContributionPlugin = () => {
  return (
    <div className="flex flex-col gap-4">
      <RecipientField />
      <Separator />
      <PaymentSchedule />
      <TokenPayoutFieldArray tokens={[]} name="payouts" />
    </div>
  );
};
