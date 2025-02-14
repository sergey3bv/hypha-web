import type { Meta, StoryObj } from '@storybook/react';

import { PersonAvatar } from './person-avatar';

const meta = {
  component: PersonAvatar,
  title: 'UI/Profile/PersonAvatar',
} satisfies Meta<typeof PersonAvatar>;

export default meta;

type Story = StoryObj<typeof PersonAvatar>;

export const Default: Story = {
  args: {
    avatarSrc: 'https://github.com/shadcn.png',
    userName: 'Username',
  },
};
