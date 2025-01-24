import type { Meta, StoryObj } from '@storybook/react';

import { CreateFormHead } from './create-form-head';

const meta = {
  component: CreateFormHead,
  title: 'Epics/Common/CreateFormHead',
} satisfies Meta<typeof CreateFormHead>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    creator: {
      avatar: 'https://github.com/shadcn.png',
      name: 'Name',
      surname: 'Surname',
    },
    type: 'Space',
    isLoading: false,
  },
};
