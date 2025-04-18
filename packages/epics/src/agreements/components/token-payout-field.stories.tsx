import type { Meta, StoryObj } from '@storybook/react';

import { TokenPayoutField } from './token-payout-field';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { useState } from 'react';
import type { Token } from './token-payout-field';

const meta = {
  component: TokenPayoutField,
  title: 'Epics/Agreements/TokenPayoutField',
} satisfies Meta<typeof TokenPayoutField>;

export default meta;

type Story = StoryObj<typeof TokenPayoutField>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState<{
      amount: string;
      token: Token | null;
    }>({
      amount: '',
      token: null,
    });

    return <TokenPayoutField {...args} value={value} onChange={setValue} />;
  },
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
    expect(canvas.getByText(/Payment Request/gi)).toBeTruthy();
  },
};
