import { AssetHead, AssetHeadProps } from './asset-head';
import { Button, Separator } from '@hypha-platform/ui';
import { RxCross1 } from 'react-icons/rx';
import { TokenBalanceChart, OneChartPoint } from './token-balance-chart';
import { TransactionsList } from '../transactions/transactions-list';
import { TransactionsListProps } from '../transactions/transactions-list';
import Link from 'next/link';

export type AssetDetailProps = {
  assetHeadProps: AssetHeadProps;
  chartData: OneChartPoint[];
  transactionsListProps: TransactionsListProps;
  isLoading?: boolean;
  closeUrl?: string;
};

export const AssetDetail = ({
  assetHeadProps,
  chartData,
  transactionsListProps,
  isLoading,
  closeUrl,
}: AssetDetailProps) => {
  const { activeFilter, setActiveFilter, pagination, transactions, loadMore } =
    transactionsListProps;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-5 justify-between mb-2">
        <AssetHead {...assetHeadProps} isLoading={isLoading} />
        <Link href={closeUrl ?? ''} scroll={false}>
          <Button
            variant="ghost"
            colorVariant="neutral"
            className="flex items-center"
          >
            Close
            <RxCross1 className="ml-2" />
          </Button>
        </Link>
      </div>
      <TokenBalanceChart data={chartData} isLoading={isLoading} />
      <Separator />
      <TransactionsList
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        pagination={pagination}
        transactions={transactions}
        isLoading={isLoading}
        loadMore={loadMore}
      />
    </div>
  );
};
