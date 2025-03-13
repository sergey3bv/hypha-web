import { Skeleton } from '@hypha-platform/ui';
import { EyeOpenIcon, ChatBubbleIcon } from '@radix-ui/react-icons';

interface DocumentStatsProps {
  isLoading?: boolean;
  views?: number;
  comments?: number;
}

export const DocumentStats = ({
  isLoading,
  views,
  comments,
}: DocumentStatsProps) => {
  return (
    <div className="flex flex-grow gap-2 text-1 text-neutral-11 items-center">
      <Skeleton width="16px" height="16px" loading={isLoading}>
        <div className="flex">
          <EyeOpenIcon className="mr-1" width={16} />
          <div>{views}</div>
        </div>
      </Skeleton>
      <Skeleton width="16px" height="16px" loading={isLoading}>
        <div className="flex ml-3">
          <ChatBubbleIcon className="mr-1" width={16} />
          <div>{comments}</div>
        </div>
      </Skeleton>
    </div>
  );
};
