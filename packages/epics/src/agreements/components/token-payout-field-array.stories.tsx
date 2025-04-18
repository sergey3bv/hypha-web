import type { Meta, StoryObj } from '@storybook/react';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import { TokenPayoutFieldArray } from './token-payout-field-array';

const meta = {
  component: TokenPayoutFieldArray,
  title: 'Epics/Agreements/TokenPayoutFieldArray',
} satisfies Meta<typeof TokenPayoutFieldArray>;

export default meta;

type Story = StoryObj<typeof TokenPayoutFieldArray>;

export const Default: Story = {
  args: {
    tokens: [
      {
        icon: 'https://raw.githubusercontent.com/spothq/cryptocurrency-icons/refs/heads/master/svg/icon/btc.svg',
        symbol: 'BTC',
        name: 'Bitcoin',
      },
      {
        icon: 'https://raw.githubusercontent.com/spothq/cryptocurrency-icons/refs/heads/master/svg/icon/eth.svg',
        symbol: 'ETH',
        name: 'Ethereum',
      },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Payment Request/i)).toBeTruthy();
    expect(canvas.getByText(/\Add/i)).toBeTruthy();
  },
};
