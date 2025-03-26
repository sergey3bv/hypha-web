import { useDropzone } from 'react-dropzone';
import React from 'react';

export type UploadLeadImageProps = {
  onChange: (acceptedFile: File | null) => void;
};

export const UploadLeadImage = ({ onChange }: UploadLeadImageProps) => {
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
      className="border border-neutral-11 border-dashed rounded-lg w-full h-[150px] flex justify-center items-center"
    >
      <input {...getInputProps()} />
      {preview && (
        <img
          className="w-full h-full object-cover"
          src={preview}
          alt="Preview"
        />
      )}
      {isDragActive ? (
        <span className={`${preview ? 'hidden' : ''}`}>Drop the file here</span>
      ) : (
        <span className={`${preview ? 'hidden' : ''}`}>
          <span className="text-accent-11">Upload</span> an image
        </span>
      )}
    </div>
  );
};
