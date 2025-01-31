import type { Meta, StoryObj } from '@storybook/react';

import { Search } from './search';

const meta = {
  component: Search,
} satisfies Meta<typeof Search>;

export default meta;

type Story = StoryObj<typeof Search>;

export const Default: Story = {
  args: {
    suggestions: [
      {
        title: 'Solar panels',
      },
      {
        title: 'Tokenomics',
      },
      {
        title: 'Regenerative economy',
      },
      {
        title: 'Web3',
      },
    ],
  },
};
