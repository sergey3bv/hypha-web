'use client';
import { FC } from 'react';
import { DiscussionTabs } from './discussion-tabs';
import { DiscussionsList } from './discussion-list';
import { Text } from '@radix-ui/themes';
import { useDiscussionsSection } from '../hooks/use-discussions-section';
import { SectionFilter, SectionLoadMore } from '@hypha-platform/ui/server';

type DiscussionSectionProps = Record<string, never>;

export const DiscussionsSection: FC<DiscussionSectionProps> = () => {
  const {
    pages,
    activeFilter,
    setActiveFilter,
    isLoading,
    loadMore,
    pagination,
    filterOptions
  } = useDiscussionsSection();

  const renderContent = () => {
    return (
      <>
        <SectionFilter
          value={activeFilter}
          onChange={setActiveFilter}
          count={pagination?.total || 0}
          label='Discussions'
          filterOptions={filterOptions}
        />
        <DiscussionTabs
          activeTab={activeFilter}
          setActiveTab={setActiveFilter}
        />
        {Array.from({ length: pages }).map((_, index) => (
          <DiscussionsList
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
              ? 'No more discussions'
              : 'Load more discussions'}
          </Text>
        </SectionLoadMore>
      </>
    );
  };

  return (
    <div className="flex flex-col w-full justify-center items-center">
      {renderContent()}
    </div>
  );
};
