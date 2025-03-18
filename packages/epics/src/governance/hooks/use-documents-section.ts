import React from 'react';
import {
  FILTER_OPTIONS_DISCUSSIONS,
  FILTER_OPTIONS_AGREEMENTS,
  FILTER_OPTIONS_PROPOSALS,
  SORT_OPTIONS,
  DOCUMENT_TYPES,
} from '../../common/constants';
import { UseDocuments } from '../../governance';

const sortOptions = SORT_OPTIONS;

type FilterOptionsType = keyof typeof filterStateMapping;

const filterStateMapping = {
  discussions: DOCUMENT_TYPES['DISCUSSIONS'],
  agreements: DOCUMENT_TYPES['AGREEMENTS'],
  proposals: DOCUMENT_TYPES['PROPOSALS'],
};

const filterOptionsMapping = {
  discussions: FILTER_OPTIONS_DISCUSSIONS,
  agreements: FILTER_OPTIONS_AGREEMENTS,
  proposals: FILTER_OPTIONS_PROPOSALS,
};

export const useDocumentsSection = ({
  useDocuments,
  filterOptionsType,
}: {
  useDocuments: UseDocuments;
  filterOptionsType: string;
}) => {
  const [activeFilter, setActiveFilter] = React.useState('all');
  const [pages, setPages] = React.useState(1);

  const filterState =
    filterStateMapping[filterOptionsType as FilterOptionsType];
  const filterOptions =
    filterOptionsMapping[filterOptionsType as FilterOptionsType];

  const { isLoading, pagination } = useDocuments({
    page: pages,
    pageSize: 3,
    filter: { state: filterState },
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
    filterState,
  };
};
