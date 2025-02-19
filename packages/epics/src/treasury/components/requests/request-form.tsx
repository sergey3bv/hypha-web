import { RequestFormHead, RequestFormHeadProps } from './request-form-head';
import { Button, Separator, Input, Switch } from '@hypha-platform/ui';
import { RxCross1 } from 'react-icons/rx';
import { IoLogoUsd } from 'react-icons/io';
import { Text } from '@radix-ui/themes';
import Link from 'next/link';
import { useState } from 'react';
import { CopyIcon } from '@radix-ui/react-icons';
import { cn } from '@hypha-platform/lib/utils';

interface RequestFormProps {
  isLoading?: boolean;
  closeUrl?: string;
  headProps?: RequestFormHeadProps;
}

export const RequestForm = ({
  isLoading,
  closeUrl,
  headProps,
}: RequestFormProps) => {
  const [activeAddresses, setActiveAddresses] = useState({
    bitcoin: false,
    ethereum: false,
    eos: false,
  });

  const handleAddressToggle =
    (field: keyof typeof activeAddresses) => (isActive: boolean) => {
      setActiveAddresses((prev) => ({
        ...prev,
        [field]: isActive,
      }));
    };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-5 justify-between mb-2">
        <RequestFormHead {...headProps} isLoading={isLoading} />
        <Link href={closeUrl ?? ''}>
          <Button
            variant="ghost"
            colorVariant="neutral"
            className="flex items-center"
          >
            Close
            <RxCross1 className="ml-2" />
          </Button>
        </Link>
      </div>
      <Separator />
      <div className="flex gap-6 flex-col">
        <div className="flex justify-between">
          <Text className="text-2 text-neutral-11">Total available</Text>
          <Input
            className="bg-neutral-3 border-neutral-6 border text-2"
            readOnly
            value={0}
            leftIcon={<IoLogoUsd />}
          />
        </div>
        <div className="flex justify-between">
          <Text className="text-2 text-neutral-11">Payout amount</Text>
          <Input
            className="text-2"
            placeholder="Type an amount"
            leftIcon={<IoLogoUsd />}
          />
        </div>
      </div>
      <Separator />
      <div className="flex gap-6 flex-col">
        <div className="flex justify-between">
          <Text
            className={cn(
              'text-2',
              activeAddresses.bitcoin ? 'text-neutral-11' : 'text-neutral-8',
            )}
          >
            To Bitcoin address
          </Text>
          <span className="flex items-center">
            <Input
              placeholder="opndsox0c8...092u72so"
              rightIcon={<CopyIcon className="mr-4" />}
              disabled={!activeAddresses.bitcoin}
              className={cn(
                'text-2 mr-3',
                !activeAddresses.bitcoin ? 'bg-neutral-6' : '',
              )}
            />
            <Switch
              checked={activeAddresses.bitcoin}
              onCheckedChange={handleAddressToggle('bitcoin')}
            />
          </span>
        </div>

        <div className="flex justify-between">
          <Text
            className={cn(
              'text-2',
              activeAddresses.ethereum ? 'text-neutral-11' : 'text-neutral-8',
            )}
          >
            To Ethereum address
          </Text>
          <span className="flex items-center">
            <Input
              placeholder="opndsox0c8...092u72so"
              rightIcon={<CopyIcon className="mr-4" />}
              disabled={!activeAddresses.ethereum}
              className={cn(
                'text-2 mr-3',
                !activeAddresses.ethereum ? 'bg-neutral-6' : '',
              )}
            />
            <Switch
              checked={activeAddresses.ethereum}
              onCheckedChange={handleAddressToggle('ethereum')}
            />
          </span>
        </div>
        <div className="flex justify-between">
          <Text
            className={cn(
              'text-2',
              activeAddresses.eos ? 'text-neutral-11' : 'text-neutral-8',
            )}
          >
            To EOS address
          </Text>
          <span className="flex items-center">
            <Input
              placeholder="opndsox0c8...092u72so"
              rightIcon={<CopyIcon className="mr-4" />}
              disabled={!activeAddresses.eos}
              className={cn(
                'text-2 mr-3',
                !activeAddresses.eos ? 'bg-neutral-6' : '',
              )}
            />
            <Switch
              checked={activeAddresses.eos}
              onCheckedChange={handleAddressToggle('eos')}
            />
          </span>
        </div>
      </div>
      <div className="flex justify-end">
        <Button>Publish</Button>
      </div>
    </div>
  );
};
