import type { Meta, StoryObj } from '@storybook/react';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { ProposalDetail } from './agreement-detail';

const meta: Meta<typeof ProposalDetail> = {
  component: ProposalDetail,
  title: 'Epics/Agreements/AgreementDetail',
};
export default meta;
type Story = StoryObj<typeof ProposalDetail>;

export const Primary: Story = {
  args: {
    creator: {
      avatar: 'https://github.com/shadcn.png',
      name: 'John',
      surname: 'Doe',
    },
    title: 'Agreement 1',
    commitment: 50,
    status: 'active',
    isLoading: false,
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum./bLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    sortOptions: [
      {
          label: 'Most Recent',
          value: 'most-recent',
        },
        {
          label: 'Oldest',
          value: 'oldest',
      },
    ],
    comments: [
      {
        id: '1',
        comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        author: {
          avatar: 'https://github.com/shadcn.png',
          name: 'Name',
          surname: 'Surname',
        },
        likes: 16,
      },
      {
        id: '2',
        comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
        author: {
          avatar: 'https://github.com/shadcn.png',
          name: 'Name',
          surname: 'Surname',
        },
        likes: 16,
      },
      {
        id: '3',
        comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        author: {
          avatar: 'https://github.com/shadcn.png',
          name: 'Name',
          surname: 'Surname',
        },
        likes: 16,
      },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Agreement 1/gi)).toBeTruthy();
    expect(canvas.getByText(/John Doe/gi)).toBeTruthy();
  },
};
