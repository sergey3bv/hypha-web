import type { Meta, StoryObj } from '@storybook/react';
import { Heading } from './index';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof Heading> = {
  component: Heading,
  title: 'atoms/Heading',
};
export default meta;
type Story = StoryObj<typeof Heading>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to Heading!/gi)).toBeTruthy();
  },
};
