import type { Meta, StoryObj } from '@storybook/react';

import { SpaceSearch } from './space-search';

const meta = {
  component: SpaceSearch,
  title: 'Epics/Spaces/SpaceSearch',
} satisfies Meta<typeof SpaceSearch>;

export default meta;

type Story = StoryObj<typeof SpaceSearch>;

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
