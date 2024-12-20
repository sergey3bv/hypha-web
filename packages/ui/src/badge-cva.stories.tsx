import type { Meta, StoryObj } from '@storybook/react';
import { BadgeCva } from './badge-cva';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof BadgeCva> = {
  component: BadgeCva,
  title: 'UI/BadgeCva',
  argTypes: {
    size: {
      control: 'select',
      options: [1, 2, 3],
      description: 'The size of the badge',
    },
    variant: {
      control: 'select',
      options: ['solid', 'soft', 'outline', 'surface'],
      description: 'The visual style variant of the badge',
    },
    colorVariant: {
      control: 'select',
      options: ['neutral', 'accent', 'success', 'warn', 'error'],
      description: 'The color scheme of the badge',
    },
    isLoading: {
      control: 'boolean',
      description: 'Whether the badge is in a loading state',
    },
    children: {
      control: 'text',
      description: 'The content of the badge',
    },
  },
};
export default meta;
type Story = StoryObj<typeof BadgeCva>;

export const Primary: Story = {
  args: {
    isLoading: false,
    children: 'Badge',
    size: 1,
    variant: 'solid',
    colorVariant: 'neutral',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Badge/gi)).toBeTruthy();
  },
};
