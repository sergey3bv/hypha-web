import type { Meta, StoryObj } from '@storybook/react';

import { DocumentLikeButton } from './document-like-button';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta = {
  component: DocumentLikeButton,
  title: "Epics/Governance/DocumentLikeButton",
} satisfies Meta<typeof DocumentLikeButton>;

export default meta;

type Story = StoryObj<typeof DocumentLikeButton>;

export const Default: Story = {
  args: {
    isLiked: false,
    isLoading: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Like/gi)).toBeTruthy();
  },
};
