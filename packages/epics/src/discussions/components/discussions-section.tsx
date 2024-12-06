'use client';
import { FC } from 'react';
import { DiscussionTabs } from './discussion-tabs';
import { DiscussionFilter } from './discussion-filter';
import DiscussionList from './discussion-list';
import { DiscussionsLoadMore } from './discussions-load-more';
import { Text } from '@radix-ui/themes';
import { useDiscussionsSection } from '../hooks/use-discussions-section';

type DiscussionSectionProps = Record<string, never>;

export const DiscussionsSection: FC<DiscussionSectionProps> = () => {
  const {
    pages,
    activeFilter,
    setActiveFilter,
    isLoading,
    loadMore,
    pagination,
  } = useDiscussionsSection();

  const renderContent = () => {
    return (
      <>
        <DiscussionFilter
          value={activeFilter}
          onChange={setActiveFilter}
          count={pagination?.total || 0}
        />
        <DiscussionTabs
          activeTab={activeFilter}
          setActiveTab={setActiveFilter}
        />
        {Array.from({ length: pages }).map((_, index) => (
          <DiscussionList
            page={index + 1}
            key={index}
            activeFilter={activeFilter}
          />
        ))}
        <DiscussionsLoadMore
          onClick={loadMore}
          disabled={pagination?.totalPages === pages}
          isLoading={isLoading}
        >
          <Text>
            {pagination?.totalPages === pages
              ? 'No more discussions'
              : 'Load more discussions'}
          </Text>
        </DiscussionsLoadMore>
      </>
    );
  };

  return (
    <div className="flex flex-col w-full justify-center items-center">
      {renderContent()}
    </div>
  );
};
