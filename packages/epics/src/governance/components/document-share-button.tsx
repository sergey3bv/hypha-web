import { Button, Skeleton } from '@hypha-platform/ui';
import { Share2Icon } from '@radix-ui/react-icons';

type DocumentShareButtonProps = {
  isLoading?: boolean;
  onClick?: () => void;
};

export const DocumentShareButton = ({
  isLoading,
  onClick,
}: DocumentShareButtonProps) => {
  return (
    <Skeleton
      width={72}
      height={32}
      loading={isLoading}
      className="w-full h-full"
    >
      <Button colorVariant="neutral" variant="ghost" onClick={onClick}>
        <Share2Icon width={16} height={16} />
        <span className="text-1 text-neutral-11">Share</span>
      </Button>
    </Skeleton>
  );
};
