import { useState } from 'react';
import { DollarSignIcon } from 'lucide-react';
import { ChevronDownIcon } from '@radix-ui/themes';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Input,
  Image,
} from '@hypha-platform/ui';

interface Token {
  icon: string;
  symbol: string;
  name: string;
}

interface TokenPayoutFieldProps {
  tokens: Token[];
}

export const TokenPayoutField = ({ tokens }: TokenPayoutFieldProps) => {
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);

  return (
    <div className="flex justify-between w-full">
      <label className="text-2 text-neutral-11">Payment Request</label>
      <div className="flex gap-2 items-center">
        <Input
          type="number"
          leftIcon={<DollarSignIcon size={'16px'} />}
          placeholder="Type an amount"
        />
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button
              variant="outline"
              colorVariant="neutral"
              className="flex justify-between items-center gap-2 min-w-[140px]"
            >
              <div className="flex items-center gap-2">
                {selectedToken ? (
                  <>
                    <Image
                      src={selectedToken.icon}
                      width={20}
                      height={20}
                      alt={`${selectedToken.name} icon`}
                    />
                    <span className="text-2 text-neutral-11">
                      {selectedToken.symbol}
                    </span>
                  </>
                ) : (
                  <span className="text-2 text-neutral-11">Select a token</span>
                )}
              </div>
              <ChevronDownIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {tokens?.map((token) => (
              <DropdownMenuItem
                key={token.symbol}
                onSelect={() => setSelectedToken(token)}
              >
                <Image
                  src={token.icon}
                  width={24}
                  height={24}
                  alt={`${token.name} icon`}
                  className="mr-2"
                />
                <span className="text-2 text-neutral-11">{token.symbol}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
