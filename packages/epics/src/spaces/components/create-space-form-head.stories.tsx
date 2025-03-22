import type { Meta, StoryObj } from '@storybook/react';

import { CreateSpaceFormHead } from './create-space-form-head';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta = {
  component: CreateSpaceFormHead,
  title: 'Epics/Spaces/CreateSpaceFormHead',
} satisfies Meta<typeof CreateSpaceFormHead>;

export default meta;

type Story = StoryObj<typeof CreateSpaceFormHead>;

export const Default: Story = {
  args: {
    creator: {
      avatar: 'https://github.com/shadcn.png',
      name: 'Name',
      surname: 'Surname',
    },
    isLoading: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Created by/gi)).toBeTruthy();
  },
};
