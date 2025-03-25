import type { Meta, StoryObj } from '@storybook/react';

import { DiscussionCardHead } from './discussion-card-head';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { subHours } from 'date-fns';

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
    publicationDate: subHours(new Date(), 3),
    isLoading: false,
    showTopButtons: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Hypha Space/gi)).toBeTruthy();
    expect(canvas.getByText(/3h/gi)).toBeTruthy();
  },
};
