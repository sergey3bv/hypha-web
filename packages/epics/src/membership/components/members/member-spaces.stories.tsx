import type { Meta, StoryObj } from '@storybook/react';
import { MemberSpaces } from './member-spaces';

const meta: Meta<typeof MemberSpaces> = {
  component: MemberSpaces,
  title: 'Epics/Membership/MemberSpaces',
};
export default meta;
type Story = StoryObj<typeof MemberSpaces>;

export const Primary: Story = {
  args: {
    spaces: [
      {
        logo: 'https://github.com/shadcn.png',
        title: 'Hypha Energy Hub',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt...',
        members: [
          {
            avatar: 'https://github.com/shadcn.png',
            name: 'Jane',
            surname: 'Doe',
          },
          {
            avatar: 'https://github.com/shadcn.png',
            name: 'Jane',
            surname: 'Doe',
          },
          {
            avatar: 'https://github.com/shadcn.png',
            name: 'Jane',
            surname: 'Doe',
          },
          {
            avatar: 'https://github.com/shadcn.png',
            name: 'Jane',
            surname: 'Doe',
          },
        ],
        projects: 72,
      },
    ],
    isLoading: false,
  },
};
