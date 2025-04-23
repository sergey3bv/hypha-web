'use client';

import {
  Separator,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@hypha-platform/ui';
import { useFormContext } from 'react-hook-form';
import { schemaProposeContribution } from './validation';
import { z } from 'zod';
import { RecipientField } from './components/recipient-field';
import { TokenPayoutFieldArray } from './components/token-payout-field-array';

export const ProposeContributionPlugin = () => {
  const methods = useFormContext<z.infer<typeof schemaProposeContribution>>();

  return (
    <div>
      <FormField
        control={methods.control}
        name="ProposeContributionPlugin"
        render={() => {
          return (
            <FormItem>
              <FormControl>
                <div className="flex flex-col gap-4">
                  <RecipientField />
                  <Separator />
                  <TokenPayoutFieldArray tokens={[]} name="payouts" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />
    </div>
  );
};
