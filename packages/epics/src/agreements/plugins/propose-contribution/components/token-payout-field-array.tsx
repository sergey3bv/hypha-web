import { Button } from '@hypha-platform/ui';
import { TokenPayoutField, Token } from './token-payout-field';
import { Cross2Icon, PlusIcon } from '@radix-ui/react-icons';
import { useFieldArray, useFormContext, Controller } from 'react-hook-form';
import React from 'react';

interface TokenPayoutFieldArrayProps {
  tokens: Token[];
  name?: string;
}

export const TokenPayoutFieldArray = ({
  tokens,
  name = 'payouts',
}: TokenPayoutFieldArrayProps) => {
  const { control, watch } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  const payouts = watch(name);
  console.debug('TokenPayoutFieldArray', { payouts });

  const handleAddField = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      append({ amount: '', token: null });
    },
    [append],
  );

  return (
    <div className="flex flex-col gap-2 w-full">
      {fields.map((field, index) => (
        <div key={field.id} className="flex items-end gap-2">
          <div className="flex-1">
            <Controller
              control={control}
              name={`${name}[${index}]`}
              render={({ field: payoutField }) => (
                <TokenPayoutField
                  arrayFieldName={name}
                  arrayFieldIndex={index}
                  tokens={tokens}
                  onChange={(value) => {
                    payoutField.onChange(value);
                  }}
                />
              )}
            />
          </div>
          <Button variant="ghost" onClick={() => remove(index)}>
            <Cross2Icon />
          </Button>
        </div>
      ))}
      <div className="flex justify-end w-full">
        <Button className="w-fit" onClick={handleAddField} variant="ghost">
          <PlusIcon />
          Add
        </Button>
      </div>
    </div>
  );
};
