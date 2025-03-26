export type PreviewImgProps = {
  src: string;
};
export const PreviewImg = ({ src }: PreviewImgProps) => {
  return (
    <img src={src} alt="Preview" className="w-full h-full object-contain" />
  );
};
