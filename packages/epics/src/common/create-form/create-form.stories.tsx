import type { Meta, StoryObj } from '@storybook/react';

import { CreateForm } from './create-form';

const meta = {
  component: CreateForm,
  title: 'Epics/Common/CreateForm',
} satisfies Meta<typeof CreateForm>;

export default meta;

type Story = StoryObj<typeof CreateForm>;

export const Default: Story = {
  args: {
    creator: {
      avatar: 'https://github.com/shadcn.png',
      name: 'Name',
      surname: 'Surname',
    },
    type: 'Space',
    isLoading: false,
    closeUrl: '',
  },
};
