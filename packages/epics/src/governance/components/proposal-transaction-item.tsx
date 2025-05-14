'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { getContract, erc20Abi } from 'viem';
import { publicClient } from '@core/common/web3/public-client';
import { EthAddress } from '../../people';
import { tokens } from '../../agreements/plugins/pay-for-expenses/tokens';

interface ProposalTransactionItemProps {
  recipient?: string;
  amount?: bigint;
  tokenAddress?: string;
}

export const ProposalTransactionItem = ({
  recipient,
  amount,
  tokenAddress,
}: ProposalTransactionItemProps) => {
  const [decimals, setDecimals] = useState<number | null>(null);
  const client = publicClient;

  useEffect(() => {
    const fetchDecimals = async () => {
      try {
        const contract = getContract({
          address: tokenAddress as `0x${string}`,
          abi: erc20Abi,
          client,
        });
        const result = await contract.read.decimals();
        setDecimals(result);
      } catch (e) {
        console.error('Failed to fetch token decimals:', e);
        setDecimals(18);
      }
    };

    fetchDecimals();
  }, [tokenAddress, client]);

  const token = tokens.find(
    (t) => t.address.toLowerCase() === tokenAddress?.toLowerCase(),
  );

  if (decimals === null || !token || !amount) return null;

  const parsedAmount = Number(amount) / 10 ** decimals;

  const formattedAmount = parsedAmount.toFixed(decimals);

  return (
    <div className="w-full flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <Image
          src={token.icon}
          alt={token.symbol}
          width={24}
          height={24}
          className="rounded-full"
        />
        <div className="text-sm font-medium text-neutral-9">
          {formattedAmount} {token.symbol}
        </div>
      </div>
      <div className="w-[140px]">
        <EthAddress address={recipient || ''} />
      </div>
    </div>
  );
};
