import React from 'react';
import { useOuterSpaces } from './use-outer-spaces';

export const useOuterSpacesSection = () => {
  const [activeSort, setSort] = React.useState('all');
  const [pages, setPages] = React.useState(1);

  const { isLoading, pagination } = useOuterSpaces({
    page: pages,
    sort: activeSort === 'all' ? { sort: 'all' } : activeSort === 'most-recent' ? { sort: 'most-recent' } : undefined,
  });

  React.useEffect(() => {
    setPages(1);
  }, [activeSort]);

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
  };
};
