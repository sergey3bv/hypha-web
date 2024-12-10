'use client';
import { FC } from 'react';
import { InnerSpacesFilter } from './inner-spaces-filter';
import InnerSpacesList from './inner-spaces-list';
import { InnerSpacesLoadMore } from './inner-spaces-load-more';
import { Text } from '@radix-ui/themes';
import { useInnerSpacesSection } from '../../hooks/use-inner-spaces-section';

type InnerSpacesSectionProps = Record<string, never>;

export const InnerSpacesSection: FC<InnerSpacesSectionProps> = () => {
  const {
    pages,
    activeSort,
    setSort,
    isLoading,
    loadMore,
    pagination,
    totalCount,
  } = useInnerSpacesSection();

  return (
    <div className="flex flex-col w-full justify-center items-center">
      <InnerSpacesFilter
        value={activeSort}
        onChange={setSort}
        count={totalCount}
      />
      {Array.from({ length: pages }).map((_, index) => (
        <InnerSpacesList page={index + 1} key={index} activeSort={activeSort} />
      ))}
      <InnerSpacesLoadMore
        onClick={loadMore}
        disabled={pagination?.totalPages === pages}
        isLoading={isLoading}
      >
        <Text>
          {pagination?.totalPages === pages
            ? 'No more inner spaces'
            : 'Load more inner spaces'}
        </Text>
      </InnerSpacesLoadMore>
    </div>
  );
};
