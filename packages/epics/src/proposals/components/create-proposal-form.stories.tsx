import type { Meta, StoryObj } from '@storybook/react';

import { CreateProposalForm } from './create-proposal-form';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta = {
  component: CreateProposalForm,
  title: 'Epics/Proposals/CreateProposalForm',
} satisfies Meta<typeof CreateProposalForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    creator: {
      avatar: 'https://github.com/shadcn.png',
      name: 'Name',
      surname: 'Surname',
    },
    isLoading: false,
    closeUrl: '',
    outcomeOptions: [
      {
        label: 'Payment',
        value: 'payment',
      },
      {
        label: 'Payment Another',
        value: 'another-payment',
      },
    ],
    numberOfWeekOptions: [
      {
        label: '4',
        value: '4',
      },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Outcome!/gi)).toBeTruthy();
  },
};
