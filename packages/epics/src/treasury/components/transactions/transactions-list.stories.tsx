import type { Meta, StoryObj } from '@storybook/react';

import { TransactionsList } from './transactions-list';

const meta = {
  component: TransactionsList,
  title: 'Epics/Treasury/TransactionsList',
} satisfies Meta<typeof TransactionsList>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    isLoading: false,
    activeFilter: 'most-recent',
    setActiveFilter: () => {},
    loadMore: () => {},
    pagination: {
      total: 1,
      totalPages: 1,
      hasNextPage: false,
    },
    sortOptions: [
      {
        label: 'Most Recent',
        value: 'most-recent',
      },
      {
        label: 'Oldest',
        value: 'oldest',
      },
    ],
    transactions: [
      {
        id: '1',
        title: 'Transaction 1',
        description: 'Description 1',
        amount: 100,
        withUsdSymbol: true,
        badges: [
          {
            label: 'Tag 1',
            variant: 'actionOutline',
          },
          {
            label: 'Tag 2',
            variant: 'positive',
          },
        ],
        author: {
          name: 'John',
          surname: 'Doe',
        },
        viewCount: 10,
        commentCount: 2,
      },
      {
        id: '2',
        title: 'Transaction 2',
        description: 'Description 2',
        amount: 200,
        withUsdSymbol: true,
        badges: [
          {
            label: 'Expense',
            variant: 'destructive',
          },
          {
            label: 'Tag 2',
            variant: 'actionOutline',
          },
        ],
        author: {
          name: 'John',
          surname: 'Doe',
        },
        viewCount: 10,
        commentCount: 2,
      },
    ],
  },
};

