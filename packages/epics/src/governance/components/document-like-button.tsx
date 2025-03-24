import { Button, Skeleton } from '@hypha-platform/ui';
import { HeartIcon, HeartFilledIcon } from '@radix-ui/react-icons';

type DocumentLikeButtonProps = {
  isLiked: boolean;
  isLoading: boolean;
  onLike: () => void;
  onUnlike: () => void;
};

export const DocumentLikeButton = ({
  isLiked,
  isLoading,
  onLike,
  onUnlike,
}: DocumentLikeButtonProps) => {
  return (
    <Skeleton
      width={72}
      height={32}
      loading={isLoading}
      className="w-full h-full"
    >
      <Button
        colorVariant="neutral"
        variant="ghost"
        onClick={isLiked ? onUnlike : onLike}
      >
        <div className="flex items-center gap-2">
          {isLiked ? (
            <HeartFilledIcon width={16} height={16} />
          ) : (
            <HeartIcon width={16} height={16} />
          )}
          {isLiked ? 'Unlike' : 'Like'}
        </div>
      </Button>
    </Skeleton>
  );
};
