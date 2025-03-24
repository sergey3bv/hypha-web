import type { Meta, StoryObj } from '@storybook/react';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import { DiscussionCard } from './discussion-card';

const meta = {
  component: DiscussionCard,
  title: 'Epics/Governance/DiscussionCard',
} satisfies Meta<typeof DiscussionCard>;

export default meta;

type Story = StoryObj<typeof DiscussionCard>;

export const Default: Story = {
  args: {
    leadImageUrl: '',
    space: {
      title: 'Hypha Space',
      logoUrl: '',
    },
    creator: {
      name: 'John',
      surname: 'Doe',
    },
    publicationDate: new Date('2025-01-01:12:00:00'),
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras non enim venenatis, dictum sem a, euismod arcu. Curabitur et urna feugiat, placerat mi ut, lacinia velit. Pellentesque eu ex neque. Aliquam ultricies varius egestas. Duis a orci dictum, tincidunt nisl nec, dignissim erat. Donec eu pretium felis. In purus leo, bibendum in ultrices at, laoreet eget dolor.',
    isLoading: false,
    replies: 10,
    likes: 20,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Hypha Space/gi)).toBeTruthy();
  },
};
