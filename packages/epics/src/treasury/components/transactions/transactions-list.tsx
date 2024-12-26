import {
  FilterOption,
  SectionFilter,
  SectionLoadMore,
} from '@hypha-platform/ui/server';
import { TransactionCard, TransactionCardProps } from './transaction-card';

type TransactionsListProps = {
  activeFilter: string;
  setActiveFilter: (value: string) => void;
  transactions?: TransactionCardProps[];
  pagination: {
    total: number;
    totalPages: number;
    hasNextPage: boolean;
  };
  sortOptions: FilterOption[];
  isLoading?: boolean;
  loadMore: () => void;
};

export const TransactionsList = ({
  activeFilter,
  setActiveFilter,
  pagination,
  sortOptions,
  transactions,
  isLoading,
  loadMore,
}: TransactionsListProps) => {
  return (
    <div className="flex flex-col gap-5">
      <SectionFilter
        value={activeFilter}
        onChange={setActiveFilter}
        count={pagination?.total || 0}
        label="Transactions"
        sortOptions={sortOptions}
      />
      <div className="flex flex-col gap-2">
        {transactions?.map((transaction) => (
          <TransactionCard
            key={transaction.id}
            {...transaction}
            isLoading={isLoading}
          />
        )) || <div>No comments</div>}
      </div>
      <SectionLoadMore
        onClick={loadMore}
        disabled={pagination?.hasNextPage}
        isLoading={isLoading}
      >
        {pagination?.hasNextPage
          ? 'No more transactions'
          : 'Load more transactions'}
      </SectionLoadMore>
    </div>
  );
};
