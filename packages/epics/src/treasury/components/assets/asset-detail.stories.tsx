import type { Meta, StoryObj } from '@storybook/react';
import { AssetDetail } from './asset-detail';
import { action } from '@storybook/addon-actions';

const meta: Meta<typeof AssetDetail> = {
  component: AssetDetail,
  title: 'Epics/Treasury/AssetDetail',
};
export default meta;

type Story = StoryObj<typeof AssetDetail>;

export const Primary: Story = {
  args: {
    assetHeadProps: {
      icon: 'https://s3-alpha-sig.figma.com/img/245b/338d/4199c4b76377fa29775a7d395db0e05d?Expires=1736121600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=L2U5H0je9x3apVrOWdgg9swC3sn7a04AvQ82riGLuoPBJ6EUYmDJiJckWVCPKcqnXOi4zv2c8U-XuP8J30pyNLkQMtJQ27UHOMfehXWi~0Sht7UuwJ2xpbtTq3xZ-zllNPqrkTZbvRJF6lfK1DU0r~5-YGhmHnSqwVu8ri3UAflQ7HhXZZvuVxREDSTLY8EBMYKI9NKa4ZWxGCZyDP8-izYe7i3uhZmMVoCmsYu7qJ5JUqVD65L2yfMCwhlmh8uCeUDRqWXPkxjgMmz90AyppcnmA3qNq38Txh6ZqHLWfo-s-24H-4ic9UmjdNcz6U8FyCaNMfui2QengZuJoi~HMw__',
      name: 'Bitcoin',
      symbol: 'BTC',
      value: 5.25791,
      usdEqual: 335887.76,
      isLoading: false,
    },

    chartData: [
      { month: 'January', value: 186000, date: '2024-01-15' },
      { month: 'February', value: 305000, date: '2024-02-10' },
      { month: 'March', value: 237000, date: '2024-03-05' },
      { month: 'April', value: 73000, date: '2024-08-01' },
      { month: 'May', value: 209000, date: '2024-09-12' },
      { month: 'June', value: 214000, date: '2024-10-10' },
    ],

    transactionsListProps: {
      activeFilter: 'all',
      setActiveFilter: action('setActiveFilter'),
      pagination: {
        total: 100,
        totalPages: 10,
        hasNextPage: true,
      },
      sortOptions: [
        { label: 'All', value: 'all' },
        { label: 'Most recent', value: 'most-recent' },
      ],
      transactions: [
        {
          id: '1',
          title: 'Transaction 1',
          description: 'Description 1',
          amount: 100,
          withUsdSymbol: true,
          badges: [{ label: 'Tag 1', variant: 'actionOutline' }],
          author: { name: 'John', surname: 'Doe' },
          viewCount: 10,
          commentCount: 2,
        },
        {
          id: '2',
          title: 'Transaction 2',
          description: 'Description 2',
          amount: 200,
          withUsdSymbol: true,
          badges: [{ label: 'Tag 2', variant: 'positive' }],
          author: { name: 'Jane', surname: 'Doe' },
          viewCount: 15,
          commentCount: 5,
        },
      ],
      loadMore: action('loadMore'),
      isLoading: false,
    },
  },
};
