import type { Meta, StoryObj } from '@storybook/react';

import { AgreementHead } from './agreement-head';

const meta = {
  component: AgreementHead,
  title: 'Epics/Agreements/AgreementHead',
} satisfies Meta<typeof AgreementHead>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    creator: {
      avatar: 'https://github.com/shadcn.png',
      name: 'Name',
      surname: 'Surname',
    },
    title: 'Agreement 1',
    commitment: 50,
    status: 'active',
    isLoading: false,
  },
};
