import type { Meta, StoryObj } from '@storybook/react';

import { DiscussionCardHead } from './discussion-card-head';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta = {
  component: DiscussionCardHead,
  title: 'Epics/Governance/DiscussionCardHead',
} satisfies Meta<typeof DiscussionCardHead>;

export default meta;

type Story = StoryObj<typeof DiscussionCardHead>;

export const Default: Story = {
  args: {
    creator: {
      name: 'Name',
      surname: 'Surname',
    },
    space: {
      title: 'Hypha Space',
      logoUrl: '',
    },
    publicationDate: new Date('2025-03-24T10:00:00.000'),
    isLoading: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Hypha Space/gi)).toBeTruthy();
  },
};
