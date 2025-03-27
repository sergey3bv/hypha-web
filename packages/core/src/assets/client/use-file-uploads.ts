import { generateReactHelpers } from '@uploadthing/react';
import { CoreFileRouter } from '../server';

export type UseFileUploadProps = {
  headers: {
    Authorization: `Bearer ${string}`;
  };
};
export const useFileUpload = ({ headers }: UseFileUploadProps) => {
  const { useUploadThing } = generateReactHelpers<CoreFileRouter>();

  const { startUpload, isUploading } = useUploadThing('imageUploader', {
    headers,
  });

  return {
    upload: startUpload,
    isUploading,
  };
};
