import { Skeleton, Button } from '@hypha-platform/ui';

interface DocumentVoteButtonProps {
  voted: boolean;
  isLoading: boolean;
}

export const DocumentVoteButton = ({
  voted,
  isLoading,
}: DocumentVoteButtonProps) => {
  return (
    <div>
      <Skeleton
        height="32px"
        width="86px"
        loading={isLoading}
        className="rounded-lg"
      >
        <div>
          {voted ? (
            <Button
              colorVariant="accent"
              className="rounded-lg w-fit"
              variant="outline"
            >
              You voted
            </Button>
          ) : (
            <Button
              colorVariant="accent"
              className="rounded-lg w-fit"
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
