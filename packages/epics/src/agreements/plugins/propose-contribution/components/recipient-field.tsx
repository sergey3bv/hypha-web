import { z } from 'zod';
import { useFormContext } from 'react-hook-form';
import { Recipient } from './recipient';
import { schemaProposeContribution } from '../validation';

export const RecipientField = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<z.infer<typeof schemaProposeContribution>>();

  const recipientRegister = register('recipient');

  return (
    <Recipient
      {...recipientRegister}
      error={errors.recipient?.message}
      onChange={(value) => recipientRegister.onChange({ target: { value } })}
      recipients={[]}
    />
  );
};
