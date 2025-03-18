import type { Meta, StoryObj } from '@storybook/react';
import { DocumentDetails } from './document-details';

const meta: Meta<typeof DocumentDetails> = {
  component: DocumentDetails,
  title: 'Epics/Governance/DocumentDetails',
};
export default meta;
type Story = StoryObj<typeof DocumentDetails>;

export const Primary: Story = {
  args: {
    creator: {
      avatarUrl: 'https://github.com/shadcn.png',
      name: 'John',
      surname: 'Doe',
    },
    closeUrl: '',
    title: 'Discussion Title',
    isLoading: false,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum./bLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    leadImage: 'https://github.com/shadcn.png',
    badges: [
      {
        label: 'discussion',
        className: 'capitalize',
        variant: 'solid',
        colorVariant: 'accent',
      },
      {
        label: '50%',
        variant: 'outline',
        colorVariant: 'accent',
      },
    ],
  },
};
