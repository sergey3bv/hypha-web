'use client';
import { FC } from 'react';
import { AgreementTabs } from './agreement-tabs';
import { AgreementFilter } from './agreement-filter';
import AgreementsList from './agreements-list';
import { AgreementsLoadMore } from './agreements-load-more';
import { Text } from '@radix-ui/themes';
import { useAgreementsSection } from '../hooks/use-agreements-section';

type AgreementsSectionProps = Record<string, never>;

export const AgreementsSection: FC<AgreementsSectionProps> = () => {
  const {
    pages,
    activeFilter,
    setActiveFilter,
    isLoading,
    loadMore,
    pagination,
  } = useAgreementsSection();

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
          activeFilter={activeFilter}
        />
      ))}
      <AgreementsLoadMore
        onClick={loadMore}
        disabled={pagination?.totalPages === pages}
        isLoading={isLoading}
      >
        <Text>
          {pagination?.totalPages === pages
            ? 'No more agreements'
            : 'Load more agreements'}
        </Text>
      </AgreementsLoadMore>
    </div>
  );
};
