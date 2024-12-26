import { AssetHead, AssetHeadProps } from './asset-head';
import { Button, Separator } from '@hypha-platform/ui';
import { RxCross1 } from 'react-icons/rx';
import { TokenBalanceChart, OneChartPoint } from '../../../interactions/components/token-balance-chart';
import { TransactionsList } from '../transactions/transactions-list';
import { TransactionCardProps } from '../transactions/transaction-card';
import { FilterOption } from '@hypha-platform/ui/server';

export type AssetDetailProps = {
  assetHeadProps: AssetHeadProps;
  chartData: OneChartPoint[];
  transactionsListProps: {
    activeFilter: string;
    setActiveFilter: (value: string) => void;
    pagination: {
      total: number;
      totalPages: number;
      hasNextPage: boolean;
    };
    sortOptions: FilterOption[];
    transactions: TransactionCardProps[];
    loadMore: () => void;
    isLoading?: boolean;
  };
  isLoading?: boolean;
};

export const AssetDetail = ({
  assetHeadProps,
  chartData,
  transactionsListProps,
  isLoading,
}: AssetDetailProps) => {
  const { 
    activeFilter, 
    setActiveFilter, 
    pagination, 
    sortOptions, 
    transactions, 
    loadMore 
  } = transactionsListProps;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-5 justify-between mb-2">
        <AssetHead {...assetHeadProps} isLoading={isLoading} />
        <Button
          variant="ghost"
          colorVariant="neutral"
          className="flex items-center"
        >
          Close
          <RxCross1 className="ml-2" />
        </Button>
      </div>
      <TokenBalanceChart data={chartData} isLoading={isLoading} />
      <Separator/>
      <TransactionsList
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        pagination={pagination}
        sortOptions={sortOptions}
        transactions={transactions}
        isLoading={isLoading}
        loadMore={loadMore}
      />
    </div>
  );
};
