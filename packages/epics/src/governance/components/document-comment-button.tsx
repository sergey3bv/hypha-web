import { Button } from '@hypha-platform/ui';
import { Skeleton } from '@hypha-platform/ui';
import { ChatBubbleIcon } from '@radix-ui/react-icons';

type DocumentCommentButtonProps = {
  isLoading?: boolean;
  onClick?: () => void;
};

export const DocumentCommentButton = ({
  isLoading,
  onClick,
}: DocumentCommentButtonProps) => {
  return (
    <Skeleton
      width={72}
      height={32}
      loading={isLoading}
      className="w-full h-full"
    >
      <Button colorVariant="neutral" variant="ghost" onClick={onClick}>
        <ChatBubbleIcon width={16} height={16} />
        <span className="text-1 text-neutral-11 ml-2">Comment</span>
      </Button>
    </Skeleton>
  );
};
