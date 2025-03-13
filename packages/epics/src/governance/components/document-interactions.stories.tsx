import type { Meta, StoryObj } from '@storybook/react';

import { DocumentInteractions } from './document-interactions';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta = {
  component: DocumentInteractions,
  title: 'Epics/Governance/DocumentInteractions',
} satisfies Meta<typeof DocumentInteractions>;

export default meta;

type Story = StoryObj<typeof DocumentInteractions>;

export const Default: Story = {
  args: {
    isLoading: false,
    state: 'agreement',
    views: 100,
    comments: 50,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText('100')).toBeTruthy();
  },
};
