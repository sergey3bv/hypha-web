import { Skeleton, Button } from '@hypha-platform/ui';

interface DocumentVoteButtonProps {
  isVoted?: boolean;
  isLoading?: boolean;
}

export const DocumentVoteButton = ({
  isVoted,
  isLoading,
}: DocumentVoteButtonProps) => {
  return (
    <div className="w-full">
      <Skeleton
        height="32px"
        width="86px"
        loading={isLoading}
        className="rounded-lg w-full"
      >
        <div>
          {isVoted ? (
            <Button
              colorVariant="accent"
              className="rounded-lg w-full"
              variant="outline"
            >
              You voted
            </Button>
          ) : (
            <Button
              colorVariant="accent"
              className="rounded-lg w-full"
              variant="outline"
            >
              Vote now
            </Button>
          )}
        </div>
      </Skeleton>
    </div>
  );
};
