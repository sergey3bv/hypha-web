import type { Meta, StoryObj } from '@storybook/react';

import { EditPersonHead } from './edit-person-head';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta = {
  component: EditPersonHead,
  title: 'UI/Profile/EditPersonHead',
} satisfies Meta<typeof EditPersonHead>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    avatar: 'https://github.com/shadcn.png',
    name: 'Name',
    surname: 'Surname',
    id: 'ndb9suh3qh9q2hlP2120dsxzf',
    isLoading: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Name Surname/gi)).toBeTruthy();
  },
};
