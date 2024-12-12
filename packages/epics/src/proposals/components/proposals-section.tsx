'use client';
import { FC } from 'react';
import { ProposalTabs } from './proposal-tabs';
import { ProposalList } from './proposal-list';
import { Text } from '@radix-ui/themes';
import { useProposalsSection } from '../hooks/use-proposals-section';
import { SectionFilter, SectionLoadMore } from '@hypha-platform/ui/server';

type ProposalSectionProps = Record<string, never>;

export const ProposalsSection: FC<ProposalSectionProps> = () => {
  const {
    pages,
    activeFilter,
    setActiveFilter,
    isLoading,
    loadMore,
    pagination,
    filterOptions
  } = useProposalsSection();

  return (
    <div className="flex flex-col w-full justify-center items-center">
      <SectionFilter
        value={activeFilter}
        onChange={setActiveFilter}
        count={pagination?.total || 0}
        label='Proposals'
        filterOptions={filterOptions}
      />
      <ProposalTabs activeTab={activeFilter} setActiveTab={setActiveFilter} />
      {Array.from({ length: pages }).map((_, index) => (
        <ProposalList
          page={index + 1}
          key={index}
          activeFilter={activeFilter}
        />
      ))}
      <SectionLoadMore
        onClick={loadMore}
        disabled={pagination?.totalPages === pages}
        isLoading={isLoading}
      >
        <Text>
          {pagination?.totalPages === pages
            ? 'No more proposals'
            : 'Load more proposals'}
        </Text>
      </SectionLoadMore>
    </div>
  );
};
