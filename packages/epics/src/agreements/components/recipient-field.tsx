import { useFormContext } from 'react-hook-form';
import { Recipient } from './recipient';
import { RecipientFormValues } from '../schemas/recipient-form-schema';

export const RecipientField = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<RecipientFormValues>();

  const recipientRegister = register('recipient');

  return (
    <div>
      <Recipient
        {...recipientRegister}
        error={errors.recipient?.message}
        onChange={(value) => recipientRegister.onChange({ target: { value } })}
        recipients={[]}
      />
    </div>
  );
};
