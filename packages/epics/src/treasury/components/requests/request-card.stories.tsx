import type { Meta, StoryObj } from '@storybook/react';

import { RequestCard } from './request-card';

const meta = {
  component: RequestCard,
  title: 'Epics/Treasury/RequestCard',
} satisfies Meta<typeof RequestCard>;

export default meta;

type Story = StoryObj<typeof RequestCard>;

export const Default: Story = {
  args: {
    name: 'John',
    surname: 'Doe',
    avatar: 'https://github.com/shadcn.png',
    value: 1000,
    symbol: 'ETH',
    date: '2024-01-01',
    isLoading: false,
  },
};
