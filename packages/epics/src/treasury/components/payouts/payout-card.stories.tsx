import type { Meta, StoryObj } from '@storybook/react';

import { PayoutCard } from './payout-card';

const meta = {
  component: PayoutCard,
  title: 'Epics/Treasury/PayoutCard',
} satisfies Meta<typeof PayoutCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'John',
    surname: 'Doe',
    avatar: 'https://github.com/shadcn.png',
    value: 100,
    symbol: 'ETH',
    date: '2024-01-01',
    status: 'completed',
    isLoading: false,
  },
};
