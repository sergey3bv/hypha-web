import React from 'react';
import { useDropzone } from 'react-dropzone';
import { LuImagePlus, LuImageUp } from 'react-icons/lu';
import clsx from 'clsx';
import { PreviewOverlay } from './preview-overlay';

export type UploadAvatarProps = {
  EditIcon?: React.ElementType;
  DropIcon?: React.ElementType;
  onChange: (acceptedFile: File | null) => void;
};

export const UploadAvatar = ({
  EditIcon = LuImagePlus,
  DropIcon = LuImageUp,
  onChange,
}: UploadAvatarProps) => {
  const [preview, setPreview] = React.useState<string | null>('');

  const onDrop = React.useCallback((acceptedFiles: File[]) => {
    const reader = new FileReader();
    try {
      reader.onload = () => {
        setPreview(reader.result as string);
        onChange(acceptedFiles[0]);
      };
      reader.readAsDataURL(acceptedFiles[0]);
    } catch (error) {
      setPreview(null);
      onChange(null);
    }
  }, []);

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
        'min-w-9 w-9 h-9 rounded-xl bg-accent-5',
      )}
    >
      <input {...getInputProps()} />
      {preview && <img src={preview} alt="Preview" />}
      <PreviewOverlay isVisible={!preview}>
        {isDragActive ? (
          <DropIcon className="h-5 w-5" />
        ) : (
          <EditIcon className="h-5 w-5" />
        )}
      </PreviewOverlay>
    </div>
  );
};
