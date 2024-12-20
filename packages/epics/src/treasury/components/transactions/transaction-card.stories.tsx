import type { Meta, StoryObj } from '@storybook/react';

import { TransactionCard } from './transaction-card';

const meta = {
  component: TransactionCard,
  title: 'Epics/Treasury/TransactionCard',
} satisfies Meta<typeof TransactionCard>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    isLoading: false,
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
    ],
    author: {
      name: 'John',
      surname: 'Doe',
    },
    viewCount: 10,
    commentCount: 2,
  },
};

