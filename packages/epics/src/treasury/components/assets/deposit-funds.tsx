'use client';
import Link from 'next/link';
import { Button, Separator } from '@hypha-platform/ui';
import { RxCross1 } from 'react-icons/rx';
import { Text } from '@radix-ui/themes';
import QRCode from 'react-qr-code';
import { CopyIcon, CheckIcon } from '@radix-ui/react-icons';
import { copyToClipboard } from '@hypha-platform/ui-utils';
import { MarkdownSuspense } from '@hypha-platform/ui/server';
import { useSpaceDetailsWeb3Rpc } from '@core/space';

interface DepositFundsProps {
  closeUrl: string;
  spaceId: number;
}

const description = `
Only Base mainnet tokens can be deposited to this address. If you send funds from another network, your tokens may be permanently lost and cannot be recovered.

All deposited tokens are held in the Space's treasury. Any future withdrawals must be approved by passing a proposal in your Space. This ensures transparency and collective decision-making over treasury funds.`;

export const DepositFunds = ({ closeUrl, spaceId }: DepositFundsProps) => {
  const { spaceDetails } = useSpaceDetailsWeb3Rpc({
    spaceId: spaceId as number,
  });

  const spaceAddress = spaceDetails?.executor;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-5 justify-between">
        <Text className="text-4 capitalize text-nowrap">Deposit Funds</Text>
        <Link href={closeUrl} scroll={false}>
          <Button variant="ghost" colorVariant="neutral">
            Close
            <RxCross1 />
          </Button>
        </Link>
      </div>
      <span className="text-2 text-neutral-11">
        <MarkdownSuspense content={description} />
      </span>
      <Separator />
      <div className="flex items-center justify-center w-full h-[300px]">
        <QRCode
          className="w-[200px] h-[200px] bg-secondary-foreground p-2 rounded-xl"
          value={spaceAddress || ''}
        />
      </div>
      <span className="flex justify-between items-center px-2 py-1 bg-secondary border borged-neutral-5 rounded-lg">
        <span className="text-neutral-9">{spaceAddress}</span>
        <CopyIcon
          className="cursor-pointer"
          onClick={() => {
            copyToClipboard(spaceAddress as string);
          }}
        />
      </span>
      <Separator />
      <Text className="text-4 capitalize text-nowrap">
        Please double-check the following:
      </Text>
      <span className="flex items-center text-neutral-11 text-1 gap-3">
        <CheckIcon />
        You are depositing Base mainnet tokens, not from any other network.
      </span>
      <span className="flex items-center text-neutral-11 text-1 gap-3">
        <CheckIcon />
        You understand that tokens can only be withdrawn after a successful
        proposal.
      </span>
      <span className="flex items-center text-neutral-11 text-1 gap-3">
        <CheckIcon />
        By proceeding, you acknowledge these conditions and confirm your deposit
        transaction.
      </span>
      <div className="flex justify-end">
        <Button
          onClick={() => {
            copyToClipboard(spaceAddress as string);
          }}
        >
          Copy Address
        </Button>
      </div>
    </div>
  );
};
