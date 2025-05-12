import { z } from 'zod';
import { recipientField } from '../components/common/recipient-field.validation';

export const schemaPayForExpenses = z.object({
  recipient: recipientField,
  payouts: z
    .array(
      z.object({
        amount: z.string().min(1, { message: 'Amount is required' }),
        token: z.string().min(1, { message: 'Token is required' }),
      }),
    )
    .min(1, { message: 'At least one payout is required' }),
});
