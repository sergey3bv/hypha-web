import React from 'react';
import { useOuterSpaces } from './use-outer-spaces';
import { SortParams } from '@hypha-platform/graphql/rsc';

const filterOptions = [
  { label: 'All', value: 'all' },
  { label: 'Most recent', value: 'most-recent' },
];

export const useOuterSpacesSection = () => {
  const [activeSort, setSort] = React.useState<SortParams['sort']>('all');
  const [pages, setPages] = React.useState(1);
  const [totalCount, setTotalCount] = React.useState<number>(0);

  const { isLoading, pagination } = useOuterSpaces({
    page: pages,
    sort: { sort: activeSort }
  });

  React.useEffect(() => {
    setPages(1);
  }, [activeSort]);

  React.useEffect(() => {
    if (pagination?.total !== undefined) {
      setTotalCount(pagination.total);
    }
  }, [pagination?.total]);

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
    activeSort,
    setSort,
    totalCount,
    filterOptions,
  };
};
