import type { Meta, StoryObj } from '@storybook/react';

import { RequestFormHead } from './request-form-head';

const meta = {
  component: RequestFormHead,
  title: 'Epics/Treasury/RequestFormHead',
} satisfies Meta<typeof RequestFormHead>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'John',
    surname: 'Doe',
    avatar: 'https://github.com/shadcn.png',
    symbol: 'ETH',
    isLoading: false,
  },
};
