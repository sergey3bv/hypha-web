import type { Meta, StoryObj } from '@storybook/react';
import { Tiptap } from './editor';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof Tiptap> = {
  component: Tiptap,
  title: 'Tiptap',
};
export default meta;
type Story = StoryObj<typeof Tiptap>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to Tiptap!/gi)).toBeTruthy();
  },
};
