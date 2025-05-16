'use client';

import { RecipientField } from '../components/common/recipient-field';
import { TokenPayoutFieldArray } from '../components/common/token-payout-field-array';
import { Separator } from '@hypha-platform/ui';
<<<<<<< main
import { tokens } from './tokens';
import { Person } from '@core/people';

export const PayForExpensesPlugin = ({
  spaceSlug,
  members,
}: {
  spaceSlug: string;
  members: Person[];
}) => {
=======
import { useTokens } from '../hooks';

export const PayForExpensesPlugin = () => {
  const { tokens } = useTokens();
>>>>>>> feat(#682): improved reusage of token list
  return (
    <div className="flex flex-col gap-4">
      <RecipientField recipients={members} />
      <Separator />
      <TokenPayoutFieldArray tokens={tokens} name="payouts" />
    </div>
  );
};
