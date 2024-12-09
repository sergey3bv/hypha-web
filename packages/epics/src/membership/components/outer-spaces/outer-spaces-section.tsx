'use client';
import { FC } from 'react';
import { OuterSpacesFilter } from './outer-spaces-filter';
import OuterSpacesList from './outer-spaces-list';
import { OuterSpacesLoadMore } from './outer-spaces-load-more';
import { Text } from '@radix-ui/themes';
import { useOuterSpacesSection } from '../../hooks/use-outer-spaces-section';

type OuterSpacesSectionProps = Record<string, never>;

export const OuterSpacesSection: FC<OuterSpacesSectionProps> = () => {
  const { pages, activeSort, setSort, isLoading, loadMore, pagination } =
    useOuterSpacesSection();

  return (
    <div className="flex flex-col w-full justify-center items-center">
      <OuterSpacesFilter
        value={activeSort}
        onChange={setSort}
        count={pagination?.total || 0}
      />
      {Array.from({ length: pages }).map((_, index) => (
        <OuterSpacesList page={index + 1} key={index} activeSort={activeSort} />
      ))}
      <OuterSpacesLoadMore
        onClick={loadMore}
        disabled={pagination?.totalPages === pages}
        isLoading={isLoading}
      >
        <Text>
          {pagination?.totalPages === pages
            ? 'No more outer spaces'
            : 'Load more outer spaces'}
        </Text>
      </OuterSpacesLoadMore>
    </div>
  );
};
