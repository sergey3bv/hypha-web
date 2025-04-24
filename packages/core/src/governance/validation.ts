import { z } from 'zod';
import { DEFAULT_IMAGE_ACCEPT } from '@core/assets';

const ALLOWED_IMAGE_FILE_SIZE = 5 * 1024 * 1024;

const createAgreementWeb2Props = {
  title: z.string().min(1).max(50),
  description: z.string().min(1).max(300),
};

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

export const schemaCreateAgreement = z.object({
  ...createAgreementWeb2Props,
});

export const schemaProposeContribution = z.object({
  recipient: z
    .string()
    .min(1, { message: 'Recipient is required' })
    .regex(/^0x[a-fA-F0-9]{40}$/, { message: 'Invalid Ethereum address' }).optional(),

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
    .min(1, { message: 'At least one payout is required' }).optional(),
});

export const schemaCreateAgreementForm = z.object({
  ...createAgreementWeb2Props,
  ...createAgreementFiles,
  recipient: schemaProposeContribution.shape.recipient,
  payouts: schemaProposeContribution.shape.payouts,
});
