import type { Meta, StoryObj } from '@storybook/react';

import { CreateProposalFormHead } from './create-proposal-form-head';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta = {
  component: CreateProposalFormHead,
  title: 'Epics/Proposals/CreateProposalFormHead',
} satisfies Meta<typeof CreateProposalFormHead>;

export default meta;

type Story = StoryObj<typeof CreateProposalFormHead>;

export const Default: Story = {
  args: {
    creator: {
      avatar: 'https://github.com/shadcn.png',
      name: 'Name',
      surname: 'Surname',
    },
    isLoading: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Name Surname!/gi)).toBeTruthy();
  },
};
