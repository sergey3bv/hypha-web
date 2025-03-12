import type { Meta, StoryObj } from '@storybook/react';

import { PersonAvatar } from './person-avatar';

const meta = {
  component: PersonAvatar,
  title: 'Epics/People/PersonAvatar',
} satisfies Meta<typeof PersonAvatar>;

export default meta;

type Story = StoryObj<typeof PersonAvatar>;

export const Default: Story = {
  args: {
    avatarSrc: 'https://github.com/shadcn.png',
    userName: 'Username',
  },
};
