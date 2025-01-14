'use client';
import { AssetDetail } from '@hypha-platform/epics';
import { SidePanel } from '../../../_components/side-panel';

export default function Loading() {
  return (
    <SidePanel>
      <AssetDetail
        isLoading={true}
        assetHeadProps={{
          icon: '',
          name: '',
          symbol: '',
          value: 0,
          usdEqual: 0,
          isLoading: true,
        }}
        chartData={[]}
        transactionsListProps={{
          activeFilter: '',
          setActiveFilter: () => {
            console.log('set active filter');
          },
          pagination: {
            total: 0,
            totalPages: 0,
            hasNextPage: true,
          },
          sortOptions: [],
          transactions: [],
          loadMore: () => {
            console.log('loaded more');
          },
        }}
      />
    </SidePanel>
  );
}
