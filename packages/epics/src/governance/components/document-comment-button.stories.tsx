import type { Meta, StoryObj } from '@storybook/react';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import { DocumentCommentButton } from './document-comment-button';

const meta = {
  component: DocumentCommentButton,
  title: 'Epics/Governance/DocumentCommentButton',
} satisfies Meta<typeof DocumentCommentButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isLoading: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Comment/gi)).toBeTruthy();
  },
};
