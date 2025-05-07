import { z } from 'zod';
import { DEFAULT_IMAGE_ACCEPT } from '@core/assets';
import { isBefore } from 'date-fns';

const ALLOWED_IMAGE_FILE_SIZE = 5 * 1024 * 1024;
const ETH_ADDRESS_REGEX = /^0x[a-fA-F0-9]{40}$/;

export const paymentScheduleOptions = [
  'Immediately',
  'Future Payment',
  'Milestones',
] as const;
export type PaymentScheduleOption = (typeof paymentScheduleOptions)[number];

export const dateRangeSchema = z
  .object({
    from: z.date().optional(),
    to: z.date().optional(),
  })
  .optional();

export const milestoneSchema = z.object({
  percentage: z.number().min(0).max(100),
  dateRange: dateRangeSchema,
});

export const paymentScheduleSchema = z
  .object({
    option: z.enum(paymentScheduleOptions),
    futureDate: z.date().optional(),
    milestones: z.array(milestoneSchema).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.option === 'Future Payment' && data.futureDate) {
      if (isBefore(data.futureDate, new Date())) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            'The future payment date must be later than the current date',
          path: ['futureDate'],
        });
      }
    }

    if (data.option === 'Milestones' && data.milestones) {
      if (!data.milestones || data.milestones.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Milestones cannot be empty',
          path: ['milestones'],
        });
        return;
      }

      const total = data.milestones.reduce((sum, m) => sum + m.percentage, 0);
      const now = new Date();

      for (let i = 0; i < data.milestones.length; i++) {
        const milestone = data.milestones[i];
        const { dateRange } = milestone;

        if (!dateRange?.from) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Each milestone must have a start date',
            path: ['milestones', i, 'dateRange', 'from'],
          });
        }

        if (i === 0 && dateRange?.from && isBefore(dateRange.from, now)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'First milestone must be in the future',
            path: ['milestones', i, 'dateRange', 'from'],
          });
        }

        const previous = data.milestones[i - 1];
        const previousFrom = previous?.dateRange?.from;
        if (
          i > 0 &&
          previousFrom &&
          dateRange?.from &&
          isBefore(dateRange.from, previousFrom)
        ) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Milestone ${i + 1} must be after milestone ${i}`,
            path: ['milestones', i, 'dateRange', 'from'],
          });
        }
      }

      if (total > 100) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Total percentage cannot exceed 100%',
          path: ['milestones'],
        });
      }
    }
  });

const createAgreementWeb2Props = {
  title: z.string().min(1).max(50),
  description: z.string().min(1).max(4000),
  slug: z
    .string()
    .min(1)
    .max(50)
    .regex(
      /^[a-z0-9-]+$/,
      'Slug must contain only lowercase letters, numbers, and hyphens',
    )
    .optional(),
  creatorId: z.number().min(1),
  spaceId: z.number().min(1),
  web3ProposalId: z.number().optional(),
};

export const schemaCreateAgreementWeb2 = z.object(createAgreementWeb2Props);

export const createAgreementWeb2FileUrls = {
  leadImage: z.string().url('Lead Image URL must be a valid URL').optional(),
};

export const schemaCreateAgreementWeb2FileUrls = z.object(
  createAgreementWeb2FileUrls,
);

export const createAgreementFiles = {
  leadImage: z
    .instanceof(File)
    .refine(
      (file) => file.size <= ALLOWED_IMAGE_FILE_SIZE,
      'File size must be less than 5MB',
    )
    .refine(
      (file) => DEFAULT_IMAGE_ACCEPT.includes(file.type),
      'File must be an image (JPEG, PNG, GIF, WEBP)',
    )
    .optional(),
  attachments: z.array(z.instanceof(File)).optional(),
};

export const schemaCreateAgreementFiles = z.object(createAgreementFiles);

export const schemaCreateAgreement = z.object({
  ...createAgreementWeb2Props,
});

export const schemaProposeContribution = z.object({
  recipient: z
    .string()
    .min(1, { message: 'Recipient is required' })
    .regex(ETH_ADDRESS_REGEX, { message: 'Invalid Ethereum address' })
    .optional(),

  payouts: z
    .array(
      z.object({
        amount: z.preprocess(
          (val) => Number(val),
          z.number().min(1, { message: 'Amount must be greater than 0' }),
        ),
        token: z.string().min(1, { message: 'Token is required' }),
      }),
    )
    .min(1, { message: 'At least one payout is required' })
    .optional(),

  paymentSchedule: paymentScheduleSchema.optional(),
});

export const transactionSchema = z.object({
  target: z
    .string()
    .regex(ETH_ADDRESS_REGEX, { message: 'Invalid Ethereum address' })
    .min(1, { message: 'Target address is required' }),
  value: z.preprocess(
    (val) => Number(val),
    z.number().min(0, { message: 'Value must be greater than or equal to 0' }),
  ),
  data: z.string().optional(),
});

export const schemaCreateAgreementForm = z.object({
  ...createAgreementWeb2Props,
  ...createAgreementFiles,
  recipient: schemaProposeContribution.shape.recipient,
  payouts: schemaProposeContribution.shape.payouts,
  paymentSchedule: paymentScheduleSchema.optional(),
});

export const schemaCreateProposalWeb3 = z.object({
  spaceId: z.number().min(1, { message: 'Space ID must be a positive number' }),
  duration: z.number().min(1, { message: 'Duration must be greater than 0' }),
  transactions: z
    .array(transactionSchema)
    .min(1, { message: 'At least one transaction is required' })
    .max(10, { message: 'A proposal cannot have more than 10 transactions' }),
});

export const mapToCreateProposalWeb3Input = (
  d: z.infer<typeof schemaCreateProposalWeb3>,
) => ({
  spaceId: d.spaceId,
  duration: d.duration,
  transactions: d.transactions.map((tx) => ({
    target: tx.target,
    value: tx.value,
    data: tx.data || '0x',
  })),
});
