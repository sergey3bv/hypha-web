import { z } from 'zod';

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
  logoUrl: z.string().url('Logo URL must be a valid URL').optional(),
  leadImage: z.string().url('Lead image must be a valid URL').optional(),
  web3SpaceId: z.number().optional(),
  parentId: z.number().optional(),
};

export const schemaCreateSpaceWeb2 = z.object(createSpaceWeb2Props);

const createSpaceWeb3Props = {
  quorum: z.number().min(1).max(100),
  unity: z.number().min(1).max(100),
  votingPowerSource: z.number().min(0).max(100),
  joinMethod: z.number().min(0).max(100),
  exitMethod: z.number().min(0).max(100),
};
export const schemaCreateSpaceWeb3 = z.object(createSpaceWeb3Props);

export const updateSpaceProps = {
  ...createSpaceWeb2Props,
  title: createSpaceWeb2Props.title.optional(),
  description: createSpaceWeb2Props.description.optional(),
};

export const schemaUpdateSpace = z.object(updateSpaceProps);

export const schemaCreateSpace = z.object({
  ...createSpaceWeb2Props,
  ...createSpaceWeb3Props,
});
