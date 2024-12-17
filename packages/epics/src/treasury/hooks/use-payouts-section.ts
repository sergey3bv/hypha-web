import React from 'react';
import { usePayouts } from './use-payouts';
import { FILTER_OPTIONS_PAYOUTS, SORT_OPTIONS } from '../../common/constants';
import { formatCurrencyValue } from '@hypha-platform/ui-utils';

const sortOptions = SORT_OPTIONS;

const filterOptions = FILTER_OPTIONS_PAYOUTS;

export const usePayoutsSection = () => {
  const [activeFilter, setActiveFilter] = React.useState('all');
  const [pages, setPages] = React.useState(1);

  const { isLoading, pagination, total } = usePayouts({
    ...(activeFilter !== 'all' && { filter: { status: activeFilter } }),
  });

  React.useEffect(() => {
    setPages(1);
  }, [activeFilter]);

  const loadMore = React.useCallback(() => {
    if (!pagination?.hasNextPage) return;
    setPages(pages + 1);
  }, [pages, pagination?.hasNextPage, setPages]);

  const totalValue = `$ ${formatCurrencyValue(total)}`;

  return {
    isLoading,
    loadMore,
    pagination,
    pages,
    setPages,
    activeFilter,
    setActiveFilter,
    sortOptions,
    filterOptions,
    totalValue,
  };
};
