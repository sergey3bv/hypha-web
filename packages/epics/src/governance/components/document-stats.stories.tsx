import type { Meta, StoryObj } from '@storybook/react';

import { DocumentStats } from './document-stats';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta = {
  component: DocumentStats,
  title: 'Epics/Governance/DocumentStats',
} satisfies Meta<typeof DocumentStats>;

export default meta;

type Story = StoryObj<typeof DocumentStats>;

export const Default: Story = {
  args: {
    isLoading: false,
    views: 100,
    comments: 50,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText('100')).toBeTruthy();
  },
};
