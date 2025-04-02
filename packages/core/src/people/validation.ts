import { DEFAULT_IMAGE_ACCEPT } from '@core/assets';
import { z } from 'zod';

export const ALLOWED_IMAGE_FILE_SIZE = 5 * 1024 * 1024;

const editPersonWeb2Props = {
  id: z.number(),
  name: z.string().min(1, {
    message: 'Name must not be empty',
  }),
  surname: z.string().min(1, {
    message: 'Surname must not be empty',
  }),
  nickname: z.string().min(1).max(12, {
    message: 'Nickname length should not exceed 12 characters',
  }),
  description: z
    .string()
    .min(1, {
      message: 'Description must not be empty',
    })
    .max(300, {
      message: 'Description length should not exceed 300 characters',
    }),
};

export const schemaEditPersonWeb2 = z.object(editPersonWeb2Props);

export const editPersonWeb2FileUrls = {
  avatarUrl: z.string().url('Avatar URL must be a valid URL').optional(),
  leadImageUrl: z.string().url('Lead Image URL must be a valid URL').optional(),
};

export const schemaEditPersonWeb2FileUrls = z.object(editPersonWeb2FileUrls);

export const editPersonFiles = {
  avatarUrl: z
    .union([
      z.string().url('Avatar URL must be a valid URL'),
      z
        .instanceof(File)
        .refine(
          (file) => file.size <= ALLOWED_IMAGE_FILE_SIZE,
          'File size must be less than 5MB',
        )
        .refine(
          (file) => DEFAULT_IMAGE_ACCEPT.includes(file.type),
          'File must be an image (JPEG, PNG, GIF, WEBP)',
        ),
    ])
    .optional(),
  leadImageUrl: z
    .union([
      z.string().url('Lead Image URL must be a valid URL'),
      z
        .instanceof(File)
        .refine(
          (file) => file.size <= ALLOWED_IMAGE_FILE_SIZE,
          'File size must be less than 5MB',
        )
        .refine(
          (file) => DEFAULT_IMAGE_ACCEPT.includes(file.type),
          'File must be an image (JPEG, PNG, GIF, WEBP)',
        ),
    ])
    .optional(),
};

export const schemaEditPersonFiles = z.object(editPersonFiles);

export const schemaEditPerson = z.object({
  ...editPersonWeb2Props,
  ...editPersonWeb2FileUrls,
});
