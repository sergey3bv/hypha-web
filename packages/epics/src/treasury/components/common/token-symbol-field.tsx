import { useFormContext } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@hypha-platform/ui';

export function TokenSymbolField() {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name="symbol"
      render={({ field }) => (
        <FormItem className="flex justify-between items-center">
          <FormLabel className="text-2 text-neutral-11 w-full">
            Token Symbol
          </FormLabel>
          <FormControl>
            <Input placeholder="Type a symbol" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
