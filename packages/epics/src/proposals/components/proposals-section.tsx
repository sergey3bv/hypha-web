'use client';
import { FC } from 'react';
import { ProposalTabs } from './proposal-tabs';
import { ProposalsFilter } from './proposal-filter';
import { ProposalLoadMore } from './proposals-load-more';
import ProposalList from './proposal-list';
import { Text } from '@radix-ui/themes';
import { useProposalsSection } from '../hooks/use-proposals-section';

type ProposalSectionProps = Record<string, never>;

export const ProposalsSection: FC<ProposalSectionProps> = () => {
  const {
    pages,
    activeFilter,
    setActiveFilter,
    isLoading,
    loadMore,
    pagination,
  } = useProposalsSection();

  return (
    <div className="flex flex-col w-full justify-center items-center">
      <ProposalsFilter
        value={activeFilter}
        onChange={setActiveFilter}
        count={pagination?.total || 0}
      />
      <ProposalTabs activeTab={activeFilter} setActiveTab={setActiveFilter} />
      {Array.from({ length: pages }).map((_, index) => (
        <ProposalList
          page={index + 1}
          key={index}
          activeFilter={activeFilter}
        />
      ))}
      <ProposalLoadMore
        onClick={loadMore}
        disabled={pagination?.totalPages === pages}
        isLoading={isLoading}
      >
        <Text>
          {pagination?.totalPages === pages
            ? 'No more proposals'
            : 'Load more proposals'}
        </Text>
      </ProposalLoadMore>
    </div>
  );
};
