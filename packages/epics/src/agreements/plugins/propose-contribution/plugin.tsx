'use client';

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
} from '@hypha-platform/ui';
import { useFormContext } from 'react-hook-form';
import { schemaProposeContribution } from './validation';
import { z } from 'zod';

export const ProposeContributionPlugin = () => {
  const methods = useFormContext<z.infer<typeof schemaProposeContribution>>();

  return (
    <div>
      <div>ProposeContributionPlugin</div>
      <FormField
        control={methods.control}
        name="ProposeContributionPlugin"
        render={({ field }) => {
          return (
            <FormItem>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />
    </div>
  );
};
