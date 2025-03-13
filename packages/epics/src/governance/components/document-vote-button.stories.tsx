import type { Meta, StoryObj } from '@storybook/react';

import { DocumentVoteButton } from './document-vote-button';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta = {
  component: DocumentVoteButton,
  title: 'Epics/Governance/DocumentVoteButton',
} satisfies Meta<typeof DocumentVoteButton>;

export default meta;

type Story = StoryObj<typeof DocumentVoteButton>;

export const Default: Story = {
  args: {
    isLoading: false,
    voted: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText('Vote now')).toBeTruthy();
  },
};
