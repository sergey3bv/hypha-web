'use client';
import { FC } from 'react';
import { useAgreements } from '../hooks/use-agreements';
import { AgreementTabs } from './agreement-tabs';
import { AgreementFilter } from './agreement-filter';
import AgreementsList from './agreements-list';
import { AgreementsLoadMore } from './agreements-load-more';
import { Text } from '@radix-ui/themes';
import React from 'react';
import { useAgreementsSection } from '../hooks/use-agreements-section';

type AgreementsSectionProps = Record<string, never>;

export const AgreementsSection: FC<AgreementsSectionProps> = () => {
  const { pages, setPages, activeFilter, setActiveFilter } =
    useAgreementsSection();

  const { isLoading, pagination } = useAgreements({
    page: 1,
    filter: { status: activeFilter },
  });

  const loadMore = React.useCallback(() => {
    if (!pagination?.hasNextPage) return;
    setPages(pages + 1);
  }, [pages, pagination?.hasNextPage, setPages]);

  return (
    <div className="flex flex-col w-full justify-center items-center">
      <AgreementFilter
        value={activeFilter}
        onChange={setActiveFilter}
        count={pagination?.total || 0}
      />
      <AgreementTabs activeTab={activeFilter} setActiveTab={setActiveFilter} />
      {Array.from({ length: pages }).map((_, index) => (
        <AgreementsList
          page={index + 1}
          key={index}
          isLoading={isLoading}
          activeFilter={activeFilter}
        />
      ))}
      <AgreementsLoadMore
        onClick={loadMore}
        disabled={!pagination?.hasNextPage}
        isLoading={isLoading}
      >
        <Text>
          {pagination?.hasNextPage
            ? 'Load more agreements'
            : 'No more agreements'}
        </Text>
      </AgreementsLoadMore>
    </div>
  );
};
