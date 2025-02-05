import type { Meta, StoryObj } from '@storybook/react';
import { SubspaceDetail } from './subspace-detail';

const meta: Meta<typeof SubspaceDetail> = {
  component: SubspaceDetail,
  title: 'Epics/Membership/SubspaceDetail',
};
export default meta;
type Story = StoryObj<typeof SubspaceDetail>;

export const Primary: Story = {
  args: {
    title: 'Some Title',
    image: 'https://github.com/shadcn.png',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat',
    members: [
      {
        avatarUrl:
          'https://images.unsplash.com/photo-1544005313-94ddf0286df2?&w=64&h=64&dpr=2&q=70&crop=faces&fit=crop',
        name: 'Name',
        surname: 'Surname',
        nickname: 'username',
        status: 'applicant',
        commitment: 50,
        location: 'Paris, France',
      },
      {
        avatarUrl:
          'https://images.unsplash.com/photo-1544005313-94ddf0286df2?&w=64&h=64&dpr=2&q=70&crop=faces&fit=crop',
        name: 'Name',
        surname: 'Surname',
        nickname: 'username',
        status: 'active',
        commitment: 50,
        location: 'Paris, France',
      },
      {
        avatarUrl:
          'https://images.unsplash.com/photo-1544005313-94ddf0286df2?&w=64&h=64&dpr=2&q=70&crop=faces&fit=crop',
        name: 'Name',
        surname: 'Surname',
        nickname: 'username',
        status: 'inactive',
        commitment: 50,
        location: 'Paris, France',
      },
      {
        avatarUrl:
          'https://images.unsplash.com/photo-1544005313-94ddf0286df2?&w=64&h=64&dpr=2&q=70&crop=faces&fit=crop',
        name: 'Name',
        surname: 'Surname',
        nickname: 'username',
        status: 'rejected',
        commitment: 50,
        location: 'Paris, France',
      },
      {
        avatarUrl:
          'https://images.unsplash.com/photo-1544005313-94ddf0286df2?&w=64&h=64&dpr=2&q=70&crop=faces&fit=crop',
        name: 'Name',
        surname: 'Surname',
        nickname: 'username',
        status: 'applicant',
        commitment: 50,
        location: 'Paris, France',
      },
      {
        avatarUrl:
          'https://images.unsplash.com/photo-1544005313-94ddf0286df2?&w=64&h=64&dpr=2&q=70&crop=faces&fit=crop',
        name: 'Name',
        surname: 'Surname',
        nickname: 'username',
        status: 'applicant',
        commitment: 50,
        location: 'Paris, France',
      },
      {
        avatarUrl:
          'https://images.unsplash.com/photo-1544005313-94ddf0286df2?&w=64&h=64&dpr=2&q=70&crop=faces&fit=crop',
        name: 'Name',
        surname: 'Surname',
        nickname: 'username',
        status: 'applicant',
        commitment: 50,
        location: 'Paris, France',
      },
      {
        avatarUrl:
          'https://images.unsplash.com/photo-1544005313-94ddf0286df2?&w=64&h=64&dpr=2&q=70&crop=faces&fit=crop',
        name: 'Name',
        surname: 'Surname',
        nickname: 'username',
        status: 'applicant',
        commitment: 50,
        location: 'Paris, France',
      },
      {
        avatarUrl:
          'https://images.unsplash.com/photo-1544005313-94ddf0286df2?&w=64&h=64&dpr=2&q=70&crop=faces&fit=crop',
        name: 'Name',
        surname: 'Surname',
        nickname: 'username',
        status: 'applicant',
        commitment: 50,
        location: 'Paris, France',
      },
    ],
  },
};
