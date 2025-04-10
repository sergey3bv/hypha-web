import Link from 'next/link';
import { Button, Separator } from '@hypha-platform/ui';
import { RxCross1 } from 'react-icons/rx';
import { Text } from '@radix-ui/themes';
import QRCode from 'react-qr-code';
import { CopyIcon, CheckIcon, Cross2Icon } from '@radix-ui/react-icons';
import { copyToClipboard } from '@hypha-platform/ui-utils';
import { MarkdownSuspense } from '@hypha-platform/ui/server';

interface DepositFundsProps {
  closeUrl: string;
  address: string;
}

const description = `
Only Base mainnet tokens can be deposited to this address. If you send funds from another network, your tokens may be permanently lost and cannot be recovered.

All deposited tokens are held in the Space's treasury. Any future withdrawals must be approved by passing a proposal in your Space. This ensures transparency and collective decision-making over treasury funds.

Please double-check the following:

- You are depositing Base mainnet tokens, not from any other network.

- You understand that tokens can only be withdrawn after a successful proposal.

- By proceeding, you acknowledge these conditions and confirm your deposit transaction.`;

export const DepositFunds = ({ closeUrl, address }: DepositFundsProps) => {
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
          value={address || ''}
        />
      </div>
      <span className="flex justify-between items-center px-2 py-1 bg-secondary border borged-neutral-5 rounded-lg">
        <span className="text-neutral-9">{address}</span>
        <CopyIcon
          className="cursor-pointer"
          onClick={() => {
            copyToClipboard(address);
          }}
        />
      </span>
      <Separator />
      <span className="flex items-center text-neutral-11 text-1 gap-3">
        <CheckIcon />
        You can do this with these conditions
      </span>
      <span className="flex items-center text-neutral-11 text-1 gap-3">
        <CheckIcon />
        You can also send x but please check y
      </span>
      <span className="flex items-center text-neutral-11 text-1 gap-3">
        <Cross2Icon />
        You cannot do this with these other conditions
      </span>
      <span className="flex items-center text-neutral-11 text-1 gap-3">
        <Cross2Icon />
        Please don’t do this as well
      </span>
      <div className="flex justify-end">
        <Button
          onClick={() => {
            copyToClipboard(address);
          }}
        >
          Copy Address
        </Button>
      </div>
    </div>
  );
};
