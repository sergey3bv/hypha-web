import type { Meta, StoryObj } from '@storybook/react';

import { CreateDiscussionHead } from './create-form-head';

const meta = {
  component: CreateDiscussionHead,
  title: 'Epics/Common/CreateFormHead',
} satisfies Meta<typeof CreateDiscussionHead>;

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
    isLoading: false
  },
};
