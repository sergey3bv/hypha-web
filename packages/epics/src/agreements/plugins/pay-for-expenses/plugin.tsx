'use client';

import { RecipientField } from '../components/common/recipient-field';
import { TokenPayoutFieldArray } from '../components/common/token-payout-field-array';
import { Separator } from '@hypha-platform/ui';
import { tokens } from './tokens';
import { Person } from '@core/people';

export const PayForExpensesPlugin = ({
  spaceSlug,
  members,
}: {
  spaceSlug: string;
  members: Person[];
}) => {
  return (
    <div className="flex flex-col gap-4">
      <RecipientField recipients={members} />
      <Separator />
      <TokenPayoutFieldArray tokens={tokens} name="payouts" />
    </div>
  );
};
