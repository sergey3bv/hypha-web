'use client';

import { Separator } from '@hypha-platform/ui';
import { RecipientField } from './components/recipient-field';
import { TokenPayoutFieldArray } from './components/token-payout-field-array';

export const ProposeContributionPlugin = () => {
  return (
    <div className="flex flex-col gap-4">
      <RecipientField />
      <Separator />
      <TokenPayoutFieldArray
        tokens={[
          {
            icon: 'https://github.com/shadcn.png',
            symbol: 'BTC',
            name: 'Bitcoin',
          },
        ]}
        name="payouts"
      />
    </div>
  );
};
