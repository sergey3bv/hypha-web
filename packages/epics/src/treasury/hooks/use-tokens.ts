import { type Token } from '../../agreements/plugins/components/common/token-payout-field-array';

const tokens: Token[] = [
  {
    symbol: 'WETH',
    icon: '/placeholder/weth-icon.png',
    address: '0x4200000000000000000000000000000000000006',
  },
  {
    symbol: 'cbBTC',
    icon: '/placeholder/cbBTC-icon.png',
    address: '0xcbB7C0000aB88B473b1f5aFd9ef808440eed33Bf',
  },
  {
    symbol: 'USDC',
    icon: '/placeholder/usdc-icon.png',
    address: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
  },
  {
    symbol: 'EURC',
    icon: '/placeholder/eurc-icon.png',
    address: '0x60a3E35Cc302bFA44Cb288Bc5a4F316Fdb1adb42',
  },
];

export function useTokens() {
  return {
    tokens,
  };
}
