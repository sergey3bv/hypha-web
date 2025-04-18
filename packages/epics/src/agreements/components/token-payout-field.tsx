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

export interface Token {
  icon: string;
  symbol: string;
  name: string;
}

export interface TokenPayout {
  amount: string;
  token: Token | null;
}

export interface TokenPayoutFieldProps {
  value: TokenPayout;
  onChange: (value: TokenPayout) => void;
  tokens: Token[];
}

export const TokenPayoutField = ({
  value,
  onChange,
  tokens,
}: TokenPayoutFieldProps) => {
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...value, amount: e.target.value });
  };

  const handleTokenChange = (token: Token) => {
    onChange({ ...value, token });
  };

  return (
    <div className="flex justify-between w-full">
      <label className="text-2 text-neutral-11">Payment Request</label>
      <div className="flex gap-2 items-center">
        <Input
          type="number"
          value={value.amount}
          onChange={handleAmountChange}
          leftIcon={<DollarSignIcon size="16px" />}
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
                {value.token ? (
                  <>
                    <Image
                      src={value.token.icon}
                      width={20}
                      height={20}
                      alt={`${value.token.name} icon`}
                    />
                    <span className="text-2 text-neutral-11">
                      {value.token.symbol}
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
            {tokens.map((token) => (
              <DropdownMenuItem
                key={token.symbol}
                onSelect={() => handleTokenChange(token)}
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
