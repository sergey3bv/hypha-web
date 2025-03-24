import type { Meta, StoryObj } from '@storybook/react';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import { DocumentShareButton } from './document-share-button';

const meta = {
  component: DocumentShareButton,
  title: 'Epics/Governance/DocumentShareButton',
} satisfies Meta<typeof DocumentShareButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isLoading: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Share/gi)).toBeTruthy();
  },
};
