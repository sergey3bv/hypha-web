import type { Meta, StoryObj } from '@storybook/react';

import { DiscussionDetails } from './discussion-details';

const meta = {
  component: DiscussionDetails,
  title: 'Epics/Governance/DiscussionDetails',
} satisfies Meta<typeof DiscussionDetails>;

export default meta;

type Story = StoryObj<typeof DiscussionDetails>;

export const Default: Story = {
  args: {
    isLoading: false,
    creator: {
      name: 'John',
      surname: 'Doe',
    },
    space: {
      title: 'Hypha Space',
      logoUrl: '',
    },
    publicationDate: new Date('2025-03-24T10:00:00.000'),
    closeUrl: '/',
    leadImageUrl: '',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras non enim venenatis, dictum sem a, euismod arcu. Curabitur et urna feugiat, placerat mi ut, lacinia velit. Pellentesque eu ex neque. Aliquam ultricies varius egestas. Duis a orci dictum, tincidunt nisl nec, dignissim erat. Donec eu pretium felis. In purus leo, bibendum in ultrices at, laoreet eget dolor.',
    messages: [
      {
        creator: {
          avatar: 'https://github.com/shadcn.png',
          name: 'John',
          surname: 'Doe',
        },
        message:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        date: '2024/09/24',
        replies: [
          {
            creator: {
              avatar: 'https://github.com/shadcn.png',
              name: 'John',
              surname: 'Doe',
            },
            message:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            date: '2024/09/24',
            replies: [],
          },
        ],
      },
      {
        creator: {
          avatar: 'https://github.com/shadcn.png',
          name: 'John',
          surname: 'Doe',
        },
        message:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        date: '2024/09/24',
        replies: [],
      },
    ],
  },
};
