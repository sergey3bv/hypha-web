import React from 'react';
import { DocumentState, UseDocuments } from '../../governance';
import { useDebouncedCallback } from 'use-debounce';

export const tabs = [
  {
    label: 'All',
    value: 'all',
  },
  {
    label: 'Hypha Space',
    value: 'hypha-space',
  },
  {
    label: 'EOS Space',
    value: 'eos-space',
  },
  {
    label: 'Hypha Energy',
    value: 'hypha-energy',
  },
];

export const useDocumentsSection = ({
  useDocuments,
  documentState,
}: {
  useDocuments: UseDocuments;
  documentState: DocumentState;
}) => {
  const [activeFilter, setActiveFilter] = React.useState('most-recent');
  const [pages, setPages] = React.useState(1);
  const [activeTab, setActiveTab] = React.useState('all');
  const [searchTerm, setSearchTerm] = React.useState<string | undefined>(
    undefined,
  );

  const onUpdateSearch = useDebouncedCallback((term: string) => {
    setSearchTerm(term);
  }, 300);

  const { isLoading, pagination } = useDocuments({
    page: pages,
    pageSize: 3,
    filter: { state: documentState },
    searchTerm,
  });

  React.useEffect(() => {
    setPages(1);
  }, [activeFilter, activeTab]);

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
    tabs,
    activeTab,
    setActiveTab,
    onUpdateSearch,
    searchTerm,
  };
};
