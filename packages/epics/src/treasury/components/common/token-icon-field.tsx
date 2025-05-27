'use client';

import { useFormContext } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  TokenIcon,
} from '@hypha-platform/ui';

export function TokenIconField() {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name="icon"
      render={({ field }) => (
        <FormItem>
          <div className="flex justify-between items-center">
            <FormLabel className="text-2 text-neutral-11">Token Icon</FormLabel>
            <FormControl>
              <TokenIcon value={field.value} onChange={field.onChange} />
            </FormControl>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
