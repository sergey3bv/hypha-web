import { useDropzone } from 'react-dropzone';
import React from 'react';
import clsx from 'clsx';
import { PreviewOverlay } from './preview-overlay';
import { PreviewImg } from './preview-img';

export type UploadLeadImageProps = {
  onChange: (acceptedFile: File | null) => void;
};

export const UploadLeadImage = ({ onChange }: UploadLeadImageProps) => {
  const [preview, setPreview] = React.useState<string | null>('');

  const onDrop = React.useCallback(
    (acceptedFiles: File[]) => {
      const reader = new FileReader();
      try {
        reader.onload = () => {
          setPreview(reader.result as string);
          onChange(acceptedFiles[0]);
        };
        reader.readAsDataURL(acceptedFiles[0]);
      } catch (error) {
        console.error('Error reading file:', error);
        setPreview(null);
        onChange(null);
      }
    },
    [onChange],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: { 'image/png': [], 'image/jpg': [], 'image/jpeg': [] },
  });

  return (
    <div
      {...getRootProps()}
      className={clsx(
        'group cursor-pointer relative',
        'flex justify-center items-center overflow-hidden',
        'w-full h-[150px] rounded-xl bg-accent-2',
        !preview && 'border border-neutral-11 border-dashed',
      )}
    >
      <input {...getInputProps()} />
      {preview && <PreviewImg src={preview} aspectRatio={16 / 9} />}
      <PreviewOverlay isVisible={!preview || isDragActive}>
        {isDragActive ? (
          <span>Drop the image here</span>
        ) : (
          <span>
            <span className="text-accent-11">Upload</span> an image
          </span>
        )}
      </PreviewOverlay>
    </div>
  );
};
