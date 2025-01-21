import { FC } from 'react';
import { PayoutCard } from './payout-card';
import { usePayouts } from '../../hooks/use-payouts';

type PayoutsListProps = {
  page: number;
  activeFilter: string;
};

export const PayoutsList: FC<PayoutsListProps> = ({ page, activeFilter }) => {
  const { payouts, isLoading } = usePayouts({
    page,
    ...(activeFilter !== 'all' && { filter: { status: activeFilter } }),
  });
  return (
    <div className="payouts-list w-full">
      {payouts.map((payout) => (
        <PayoutCard
          key={`${payout.name} ${payout.surname} ${payout.value}`}
          {...payout}
          isLoading={isLoading}
        />
      ))}
      {isLoading ? (
        <div>
          <PayoutCard isLoading={isLoading} />
          <PayoutCard isLoading={isLoading} />
          <PayoutCard isLoading={isLoading} />
          <PayoutCard isLoading={isLoading} />
        </div>
      ) : null}
    </div>
  );
};
