import React from 'react';
import { useProposals } from './use-proposals';
import { FILTER_OPTIONS_PROPOSALS, SORT_OPTIONS } from '../../common/constants';

const sortOptions = SORT_OPTIONS;

const filterOptions = FILTER_OPTIONS_PROPOSALS;

export const useProposalsSection = () => {
  const [activeFilter, setActiveFilter] = React.useState('all');
  const [pages, setPages] = React.useState(1);

  const { isLoading, pagination } = useProposals({
    ...(activeFilter !== 'all' && { filter: { status: activeFilter } }),
  });

  React.useEffect(() => {
    setPages(1);
  }, [activeFilter]);

  const loadMore = React.useCallback(() => {
    if (!pagination?.hasNextPage) return;
    setPages(pages + 1);
  }, [pages, pagination?.hasNextPage, setPages]);

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
  };
};
