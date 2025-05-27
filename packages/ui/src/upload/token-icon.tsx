'use client';

import { useState, useEffect, useCallback } from 'react';
import { UploadIcon, XIcon } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@hypha-platform/lib/utils';

interface TokenIconProps {
  value: string | null;
  onChange: (file: File | null) => void;
  defaultImageUrl?: string;
  isUploading?: boolean;
}

export const TokenIcon = ({
  value,
  onChange,
  defaultImageUrl,
  isUploading = false,
}: TokenIconProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    defaultImageUrl || null,
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      onChange(file);
    }
  };

  const handleReset = useCallback(() => {
    setPreviewUrl(null);
    onChange(null);
  }, [onChange]);

  useEffect(() => {
    if (value) {
      setPreviewUrl(value);
    } else {
      setPreviewUrl(defaultImageUrl || null);
    }
  }, [value, defaultImageUrl]);

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
