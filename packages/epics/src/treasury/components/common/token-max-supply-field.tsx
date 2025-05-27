import { useFormContext } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@hypha-platform/ui';

export function TokenMaxSupplyField() {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name="maxSupply"
      render={({ field }) => (
        <FormItem className="flex justify-between items-center">
          <FormLabel className="text-2 text-neutral-11 w-full">
            Token Max Supply
          </FormLabel>
          <FormControl>
            <Input placeholder="Type an amount or 0 for unlimited supply" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
