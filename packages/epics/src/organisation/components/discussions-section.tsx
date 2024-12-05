'use client';
import { FC } from 'react';
import { useDiscussions } from '../hooks/use-discussions';
import { DiscussionTabs } from './discussion-tabs';
import { DiscussionFilter } from './discussion-filter';
import DiscussionList from './discussion-list';

type DiscussionSectionProps = Record<string, never>;

export const DiscussionsSection: FC<DiscussionSectionProps> = () => {
  const {
    discussionsCount,
    activeStatus,
    setActiveStatus,
    loadMore,
    filteredDiscussions,
    isLoading,
  } = useDiscussions();

  const renderContent = () => {
    return (
      <>
        <DiscussionFilter
          value={activeStatus}
          count={discussionsCount}
          onChange={setActiveStatus}
        />
        <DiscussionTabs
          activeTab={activeStatus}
          setActiveTab={setActiveStatus}
        />
        <DiscussionList
          isLoading={isLoading}
          discussions={filteredDiscussions}
          onLoadMore={loadMore}
        />
      </>
    );
  };

  return (
    <div className="flex flex-col w-full justify-center items-center">
      {renderContent()}
    </div>
  );
};
