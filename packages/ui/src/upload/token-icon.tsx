'use client';

import { useState, useEffect, useCallback } from 'react';
import { UploadIcon, XIcon } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@hypha-platform/lib/utils';

interface TokenIconProps {
  uploadedFile: string | null;
  onUpload: (files: File[]) => void;
  onReset: () => void;
  defaultImageUrl?: string;
  isUploading?: boolean;
}

export const TokenIcon = ({
  uploadedFile,
  onUpload,
  onReset,
  defaultImageUrl,
  isUploading = false,
}: TokenIconProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    defaultImageUrl || null,
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const fileArray = Array.from(files);
      const objectUrl = URL.createObjectURL(fileArray[0]);
      setPreviewUrl(objectUrl);
      onUpload(fileArray);
    }
  };

  const handleReset = useCallback(() => {
    setPreviewUrl(null);
    onReset();
  }, [onReset]);

  useEffect(() => {
    if (uploadedFile) {
      setPreviewUrl(uploadedFile);
    }
  }, [uploadedFile]);

  return (
    <div className="flex items-center space-x-2">
      {!previewUrl ? (
        <label className="inline-flex items-center space-x-2 px-3 py-2 rounded-md border text-sm cursor-pointer transition">
          <UploadIcon size={16} />
          <span>Upload</span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
            disabled={isUploading}
          />
        </label>
      ) : (
        <>
          <div className="relative w-8 h-8">
            <Image
              src={previewUrl}
              alt="Token Icon"
              width={32}
              height={32}
              className="rounded-full object-cover w-8 h-8"
            />
          </div>
          <button
            type="button"
            onClick={handleReset}
            className={cn(
              'w-5 h-5 flex items-center justify-center rounded-full text-muted-foreground hover:text-foreground transition',
            )}
          >
            <XIcon size={16} />
          </button>
        </>
      )}
    </div>
  );
};
