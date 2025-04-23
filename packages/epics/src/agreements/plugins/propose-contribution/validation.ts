import { z } from 'zod';

export const schemaProposeContribution = z.object({
  ProposeContributionPlugin: z
    .string()
    .min(1, { message: 'Contribution cannot be empty' })
    .max(1000, { message: 'Contribution is too long (max 1000 characters)' })
    .transform((val) => val.trim()),
});

export type ProposeContributionInput = z.infer<
  typeof schemaProposeContribution
>;
