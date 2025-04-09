import Link from 'next/link';
import { Button, Separator, Input } from '@hypha-platform/ui';
import { RxCross1 } from 'react-icons/rx';
import { Text } from '@radix-ui/themes';
import QRCode from 'react-qr-code';
import { CopyIcon, CheckIcon, Cross2Icon } from '@radix-ui/react-icons';
import { copyToClipboard } from '@hypha-platform/ui-utils';

interface DepositFundsProps {
  closeUrl: string;
  description?: string;
  address: string;
}

export const DepositFunds = ({
  closeUrl,
  description,
  address,
}: DepositFundsProps) => {
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
      <span className="text-2 text-neutral-11">{description}</span>
      <Separator />
      <div className="flex items-center justify-center w-full h-[300px]">
        <QRCode
          className="w-[200px] h-[200px] w-[200px] h-[200px] bg-secondary-foreground p-2 rounded-xl"
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
