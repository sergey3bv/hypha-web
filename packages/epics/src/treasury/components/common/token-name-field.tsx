import { useFormContext } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@hypha-platform/ui';

export function TokenNameField() {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name="tokenName"
      render={({ field }) => (
        <FormItem className="flex justify-between items-center">
          <FormLabel className="text-2 text-neutral-11 w-full">
            Token Name
          </FormLabel>
          <FormControl>
            <Input placeholder="Type a name" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
