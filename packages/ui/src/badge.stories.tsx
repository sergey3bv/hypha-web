import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './badge';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof Badge> = {
  component: Badge,
  title: 'UI/Badge',
};
export default meta;
type Story = StoryObj<typeof Badge>;

export const Primary = {
  args: {
    isLoading: false,
    children: 'Badge',
  },
};

export const Heading: Story = {
  args: {
    isLoading: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to Badge!/gi)).toBeTruthy();
  },
};
