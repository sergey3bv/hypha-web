import React from 'react';
import { useAgreements } from './use-agreements';

export const useAgreementsSection = () => {
  const [activeFilter, setActiveFilter] = React.useState('all');

  const { isLoading, pagination } = useAgreements({
    page: 1,
    ...(activeFilter !== 'all' && { filter: { status: activeFilter } }),
  });

  const [pages, setPages] = React.useState(1);

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
  };
};
