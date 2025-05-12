import { z } from 'zod';
import { useFormContext } from 'react-hook-form';
import { Recipient } from './recipient';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@hypha-platform/ui';
import { recipientFieldSchema } from './recipient-field.validation';

export const RecipientField = () => {
  const { control } = useFormContext<z.infer<typeof recipientFieldSchema>>();
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
              recipients={[]}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
