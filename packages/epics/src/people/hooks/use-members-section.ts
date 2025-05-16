import React, { useState } from 'react';
import { FILTER_OPTIONS_MEMBERS } from '../../common/constants';
import { FilterParams, Person } from '@hypha-platform/core/client';
import { type UseMembers } from './types';

const filterOptions = FILTER_OPTIONS_MEMBERS;

type UseMembersSectionProps = {
  useMembers: UseMembers;
  spaceSlug?: string;
};

export const useMembersSection = ({
  useMembers,
  spaceSlug,
}: UseMembersSectionProps) => {
  const [activeFilter, setActiveFilter] = useState<FilterParams<Person>>();
  const [pages, setPages] = React.useState(1);

  const { isLoading, pagination } = useMembers({
    ...(activeFilter !== undefined && { filter: activeFilter }),
    spaceSlug: spaceSlug,
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
    filterOptions,
  };
};
