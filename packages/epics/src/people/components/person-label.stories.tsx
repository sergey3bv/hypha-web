import type { Meta, StoryObj } from '@storybook/react';

import { PersonLabel } from './person-label';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta = {
  component: PersonLabel,
  title: 'Epics/People/PersonLabel',
} satisfies Meta<typeof PersonLabel>;

export default meta;

type Story = StoryObj<typeof PersonLabel>;

export const Default: Story = {
  args: {
    creator: {
      name: 'Name',
      surname: 'Surname',
      avatarUrl: 'https://github.com/shadcn.png',
    },
    isLoading: false,
    hasAvatar: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Name Surname/gi)).toBeTruthy();
  },
};
