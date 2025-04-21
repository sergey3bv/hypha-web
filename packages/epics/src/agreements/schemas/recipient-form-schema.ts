import { z } from 'zod';

const ETH_ADDRESS_REGEX = /^0x[a-fA-F0-9]{40}$/;

export const recipientFormSchema = z.object({
  recipient: z
    .string()
    .min(1, 'Recipient is required')
    .regex(ETH_ADDRESS_REGEX, 'Invalid Ethereum address'),
});

export type RecipientFormValues = z.infer<typeof recipientFormSchema>;
