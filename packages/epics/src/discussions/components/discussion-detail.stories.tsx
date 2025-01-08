import type { Meta, StoryObj } from '@storybook/react';
import { DiscussionDetail } from './discussion-detail';

const meta: Meta<typeof DiscussionDetail> = {
  component: DiscussionDetail,
  title: 'Epics/Discussions/DiscussionDetail',
};
export default meta;
type Story = StoryObj<typeof DiscussionDetail>;

export const Primary: Story = {
  args: {
    creator: {
      avatar: 'https://github.com/shadcn.png',
      name: 'John',
      surname: 'Doe',
    },
    closeUrl: '',
    title: 'Discussion Title',
    isLoading: false,
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum./bLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
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
        replies: [],
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
        replies: [
          {
            creator: {
              avatar: 'https://github.com/shadcn.png',
              name: 'Name',
              surname: 'Surname',
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
    image:
      'https://github.com/shadcn.png',
  },
};
