import type { Meta, StoryObj } from '@storybook/react';
import { OuterSpaceCard } from './outer-space-card';

const meta: Meta<typeof OuterSpaceCard> = {
  component: OuterSpaceCard,
  title: 'Epics/Spaces/OuterSpaceCard',
};
export default meta;
type Story = StoryObj<typeof OuterSpaceCard>;

export const Primary: Story = {
  args: {
    logo: 'https://github.com/shadcn.png',
    title: 'Hypha Energy Hub',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt...',
    members: [
      {
        avatar: 'https://github.com/shadcn.png',
        name: 'Jane',
        surname: 'Doe',
      },
      {
        avatar: 'https://github.com/shadcn.png',
        name: 'Jane',
        surname: 'Doe',
      },
      {
        avatar: 'https://github.com/shadcn.png',
        name: 'Jane',
        surname: 'Doe',
      },
      {
        avatar: 'https://github.com/shadcn.png',
        name: 'Jane',
        surname: 'Doe',
      },
    ],
    projects: 72,
    isLoading: false,
  },
};
