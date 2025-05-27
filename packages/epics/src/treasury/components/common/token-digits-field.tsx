import { useFormContext } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@hypha-platform/ui';

export function TokenDigitsField() {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name="tokenDigits"
      render={({ field }) => (
        <FormItem className="flex justify-between items-center">
          <FormLabel className="text-2 text-neutral-11 w-full">
            Digits (after comma)
          </FormLabel>
          <FormControl>
            <Input type="number" placeholder="Type a number" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
