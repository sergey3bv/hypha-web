import type { Meta, StoryObj } from '@storybook/react';
import { DaoCard } from './dao-card';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof DaoCard> = {
  component: DaoCard,
  title: 'molecules/DaoCard',
};
export default meta;
type Story = StoryObj<typeof DaoCard>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to DaoCard!/gi)).toBeTruthy();
  },
};
