import { z } from 'zod';
import { useFormContext } from 'react-hook-form';
import { Recipient } from './recipient';
import { schemaProposeContribution } from '../validation';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@hypha-platform/ui';

export const RecipientField = () => {
  const { control } =
    useFormContext<z.infer<typeof schemaProposeContribution>>();
  return (
    <FormField
      control={control}
      name="recipient"
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Recipient onChange={field.onChange} recipients={[]} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
