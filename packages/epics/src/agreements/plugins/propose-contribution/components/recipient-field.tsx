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
            <Recipient
              onChange={(recipient) => {
                field.onChange(recipient.address);
              }}
              recipients={[
                {
                  name: 'name',
                  surname: 'surname',
                  avatarUrl: 'https://github.com/shadcn.png',
                  address: '0x9EeA2E2FDeD36A1Ac361e5E1c7B74c46E588e500',
                },
              ]}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
