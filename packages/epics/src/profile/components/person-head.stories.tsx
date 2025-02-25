import type { Meta, StoryObj } from '@storybook/react';

import { PersonHead } from './person-head';

const meta = {
  component: PersonHead,
  title: 'UI/Profile/PersonHead',
} satisfies Meta<typeof PersonHead>;

export default meta;

type Story = StoryObj<typeof PersonHead>;

export const Default: Story = {
  args: {
    avatar: 'https://github.com/shadcn.png',
    name: 'Name',
    surname: 'Surname',
    background: 'https://github.com/shadcn.png',
    socials: {
      LinkedIn: 'NameSurname',
      X: '@namesurname',
      Website: 'namesurname.org',
    },
    isLoading: false,
    about:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.',
  },
};
