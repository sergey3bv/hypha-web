import type { Meta, StoryObj } from '@storybook/react';

import { BadgesList } from './badges-list';

const meta = {
  component: BadgesList,
  title: 'UI/Molecules/BadgesList',
} satisfies Meta<typeof BadgesList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    badges: [
      {
        label: 'Badge 1',
        variant: 'solid',
      },
      {
        label: 'Badge 2',
        variant: 'soft',
        colorVariant: 'success',
      },
      {
        label: 'Badge 3',
        variant: 'surface',
        colorVariant: 'warn',
      },
    ],
  },
};
