import React from 'react';
import { usePayouts } from './use-payouts';
import { FILTER_OPTIONS_PAYOUTS } from '../../common/constants';
import { formatCurrencyValue } from '@hypha-platform/ui-utils';

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
    filterOptions,
    totalValue,
  };
};
