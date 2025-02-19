import type { Meta, StoryObj } from '@storybook/react';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to RequestFormHead!/gi)).toBeTruthy();
    expect(canvas.getByText(/John Doe/gi)).toBeTruthy();
  },
};
