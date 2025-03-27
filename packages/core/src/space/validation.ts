import { z } from 'zod';

export const ALLOWED_IMAGE_FILE_SIZE = 5 * 1024 * 1024;

const createSpaceWeb2Props = {
  title: z.string().min(1).max(50),
  description: z.string().min(1).max(300),
  slug: z
    .string()
    .min(1)
    .max(50)
    .regex(
      /^[a-z0-9-]+$/,
      'Slug must contain only lowercase letters, numbers, and hyphens',
    )
    .optional(),
  web3SpaceId: z.number().optional(),
  parentId: z.number().optional(),
};

export const schemaCreateSpaceWeb2 = z.object(createSpaceWeb2Props);

export const createSpaceWeb2FileUrls = {
  logoUrl: z.string().url('Logo URL must be a valid URL').optional(),
  leadImage: z.string().url('Lead Image URL must be a valid URL').optional(),
};

export const schemaCreateSpaceWeb2FileUrls = z.object(createSpaceWeb2FileUrls);

const createSpaceWeb3Props = {
  quorum: z.number().min(1).max(100),
  unity: z.number().min(1).max(100),
  votingPowerSource: z.number().min(0).max(100),
  joinMethod: z.number().min(0).max(100),
  exitMethod: z.number().min(0).max(100),
};
export const schemaCreateSpaceWeb3 = z.object(createSpaceWeb3Props);

export const createSpaceFiles = {
  logoUrl: z
    .instanceof(File)
    .refine(
      (file) => file.size <= ALLOWED_IMAGE_FILE_SIZE,
      'File size must be less than 5MB',
    )
    .optional(),
  leadImage: z
    .instanceof(File)
    .refine(
      (file) => file.size <= ALLOWED_IMAGE_FILE_SIZE,
      'File size must be less than 5MB',
    )
    .optional(),
};

export const schemaCreateSpaceFiles = z.object(createSpaceFiles);

export const updateSpaceProps = {
  ...createSpaceWeb2Props,
  ...createSpaceWeb2FileUrls,
  title: createSpaceWeb2Props.title.optional(),
  description: createSpaceWeb2Props.description.optional(),
};

export const schemaUpdateSpace = z.object(updateSpaceProps);

export const schemaCreateSpace = z.object({
  ...createSpaceWeb2Props,
  ...createSpaceWeb3Props,
});
