import type { Meta, StoryObj } from '@storybook/react';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import { DocumentCreateFormWelcome } from './document-create-form-welcome';

const meta = {
  component: DocumentCreateFormWelcome,
  title: 'Epics/Governance/DocumentCreateFormWelcome',
} satisfies Meta<typeof DocumentCreateFormWelcome>;

export default meta;

type Story = StoryObj<typeof DocumentCreateFormWelcome>;

export const Default: Story = {
  args: {
    isLoading: false,
    closeUrl: '/',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla luctus ex est, eu volutpat sem ultrices eget. Etiam in ornare eros. In at accumsan odio, quis facilisis mi. Nam accumsan sem sit amet interdum semper. Duis non lacinia lacus. Quisque id libero posuere turpis bibendum rutrum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla luctus ex est, eu volutpat sem ultrices eget. Etiam in ornare eros. In at accumsan odio, quis facilisis mi. Nam accumsan sem sit amet interdum semper. Duis non lacinia lacus. Quisque id libero posuere turpis bibendum rutrum.',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Create a Discussion/gi)).toBeTruthy();
  },
};
