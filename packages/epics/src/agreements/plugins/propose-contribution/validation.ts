import { z } from 'zod';

const ETH_ADDRESS_REGEX = /^0x[a-fA-F0-9]{40}$/;

export const schemaProposeContribution = z.object({
  ProposeContributionPlugin: z
    .string()
    .min(1, { message: 'Contribution cannot be empty' })
    .max(1000, { message: 'Contribution is too long (max 1000 characters)' })
    .transform((val) => val.trim()),
  recipient: z
    .string()
    .min(1, { message: 'Recipient is required' })
    .regex(ETH_ADDRESS_REGEX, { message: 'Invalid Ethereum address' }),
});
