import type { Meta, StoryObj } from '@storybook/react';

import { DepositFunds } from './deposit-funds';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta = {
  component: DepositFunds,
  title: 'Epics/Treasury/DepositFunds',
} satisfies Meta<typeof DepositFunds>;

export default meta;

type Story = StoryObj<typeof DepositFunds>;

export const Default: Story = {
  args: {
    closeUrl: '/',
    address: 'opndsox0c8vbi91H092u7nz0A02so',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getAllByText(/Deposit Funds/gi)).toBeTruthy();
  },
};
