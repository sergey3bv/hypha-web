import { useState } from 'react';
import { Button } from '@hypha-platform/ui';
import { TokenPayoutField, Token, TokenPayout } from './token-payout-field';
import { PlusIcon } from '@radix-ui/react-icons';

interface TokenPayoutFieldArrayProps {
  tokens: Token[];
  onChange: (value: TokenPayout[]) => void;
}

export const TokenPayoutFieldArray = ({
  tokens,
  onChange,
}: TokenPayoutFieldArrayProps) => {
  const [fields, setFields] = useState<TokenPayout[]>([
    { amount: '', token: null },
  ]);

  const updateField = (index: number, newValue: TokenPayout) => {
    const newFields = [...fields];
    newFields[index] = newValue;
    setFields(newFields);
    onChange(newFields);
  };

  const addField = () => {
    const newFields = [...fields, { amount: '', token: null }];
    setFields(newFields);
    onChange(newFields);
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      {fields.map((field, index) => (
        <div key={index} className="flex items-end gap-2">
          <TokenPayoutField
            value={field}
            onChange={(newValue) => updateField(index, newValue)}
            tokens={tokens}
          />
        </div>
      ))}
      <div className="flex justify-end w-full">
        <Button className="w-fit" onClick={addField} variant="ghost">
          <PlusIcon />
          Add
        </Button>
      </div>
    </div>
  );
};
