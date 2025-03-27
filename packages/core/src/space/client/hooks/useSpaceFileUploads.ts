import { useFileUpload } from '@core/assets';
import { schemaCreateSpaceFiles } from '@core/space/validation';
import React from 'react';
import { z } from 'zod';

type Files = z.infer<typeof schemaCreateSpaceFiles>;

export type UseSpaceFileUploadsReturn = {
  isLoading: boolean;
  files:
    | {
        [K in keyof Files]: string;
      }
    | null;
  upload: (fileInput: Files) => Promise<void>;
};

export const useSpaceFileUploads = (
  authToken?: string | null,
): UseSpaceFileUploadsReturn => {
  const [files, setFiles] = React.useState<{ [K in keyof Files]: string }>(
    {} as { [K in keyof Files]: string },
  );
  const { upload, isUploading } = useFileUpload({
    headers: { Authorization: `Bearer ${authToken}` },
  });

  const handleUpload = React.useCallback(
    async (fileInput: Files) => {
      const uploadPromises = Object.entries(fileInput).map(
        async ([key, file]) => {
          if (!file) return;

          try {
            const result = await upload([file]);
            if (result?.[0]?.ufsUrl) {
              setFiles((prev) => ({
                ...prev,
                [key]: result[0].ufsUrl,
              }));
            }
          } catch (error) {
            console.error(`Failed to upload file for ${key}:`, error);
            throw error;
          }
        },
      );

      await Promise.all(uploadPromises);
    },
    [upload],
  );

  return {
    isLoading: isUploading,
    files: isUploading ? null : files,
    upload: handleUpload,
  };
};
