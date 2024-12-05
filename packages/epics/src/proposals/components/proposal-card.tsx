import { Text } from '@radix-ui/themes';
import { Card, Button, Badge } from '@hypha-platform/ui';
import Image from 'next/image';
import { Skeleton } from '@hypha-platform/ui';

type CreatorType = {
  avatar?: string;
  name?: string;
  surname?: string;
};

type ProposalCardProps = {
  creator?: CreatorType;
  title?: string;
  commitment?: number;
  status?: string;
  isLoading?: boolean | undefined;
};

const statusBadge = (status: string, isLoading: boolean | undefined) => {
  switch (status) {
    case 'active':
      return (
        <Badge isLoading={isLoading} variant="positive">
          Active
        </Badge>
      );
    case 'voting':
      return (
        <Badge isLoading={isLoading} variant="warning">
          On voting
        </Badge>
      );
    case 'completed':
      return (
        <Badge isLoading={isLoading} variant="action">
          Completed
        </Badge>
      );
    case 'rejected':
      return (
        <Badge isLoading={isLoading} variant="destructive">
          Rejected
        </Badge>
      );
  }
};

const voted = false;

export const ProposalCard: React.FC<ProposalCardProps> = ({
  commitment,
  status,
  title,
  creator,
  isLoading,
}) => {
  return (
    <Card className="w-full h-full p-6 mb-2 flex">
      {isLoading ? (
        <Skeleton width={64} height={64} className="rounded-lg mr-3" />
      ) : (
        <Image
          className="rounded-lg mr-3"
          src={creator?.avatar ?? ''}
          height={64}
          width={64}
          alt={
            creator?.name && creator?.surname
              ? `${creator.name} ${creator.surname}`
              : 'Creator Avatar'
          }
        />
      )}
      <div className="flex justify-between items-center w-full">
        <div className="flex flex-col">
          <div className="flex gap-x-1">
            <Badge isLoading={isLoading} variant="action">
              Proposal
            </Badge>
            <Badge isLoading={isLoading} variant="actionOutline">
              Recurring
            </Badge>
            <Badge isLoading={isLoading} variant="actionOutline">
              {commitment}%
            </Badge>
            {status ? statusBadge(status, isLoading) : null}
          </div>
          {isLoading ? (
            <Skeleton height={26} width={160} className="my-1" />
          ) : (
            <Text className="text-3">{title}</Text>
          )}
          {isLoading ? (
            <Skeleton height={16} width={80} />
          ) : (
            <Text className="text-xs text-gray-500">
              {creator?.name} {creator?.surname}
            </Text>
          )}
        </div>
        <div>
          {isLoading ? (
            <div>
              <Skeleton height={32} width={86} className="rounded-lg" />
            </div>
          ) : (
            <div>
              {voted ? (
                <Button
                  className="rounded-lg w-fit"
                  variant="actionOutlineChecked"
                  size="sm"
                >
                  You voted yes
                </Button>
              ) : (
                <Button
                  className="rounded-lg w-fit"
                  variant="actionOutline"
                  size="sm"
                >
                  Vote now
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
