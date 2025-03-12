import type { Meta, StoryObj } from '@storybook/react';

import { CreateSpaceForm } from './create-space-form';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta = {
  component: CreateSpaceForm,
  title: 'Epics/Spaces/CreateSpaceForm',
} satisfies Meta<typeof CreateSpaceForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    creator: {
      avatar: 'https://github.com/shadcn.png',
      name: 'Name',
      surname: 'Surname',
    },
    isLoading: false,
    closeUrl: '',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Website/gi)).toBeTruthy();
    expect(canvas.getByText(/LinkedIn/gi)).toBeTruthy();
  },
};
