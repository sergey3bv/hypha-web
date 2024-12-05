import { Text } from '@radix-ui/themes';
import { Card, Badge, Skeleton, StatusBadge } from '@hypha-platform/ui';
import Image from 'next/image';
import { EyeOpenIcon, ChatBubbleIcon } from '@radix-ui/react-icons';

type Creator = {
  avatar?: string;
  name?: string;
  surname?: string;
};

type AgreementCardProps = {
  creator?: Creator;
  title?: string;
  commitment?: number;
  status?: string;
  views?: number;
  comments?: number;
  isLoading?: boolean | undefined;
};

export const AgreementCard: React.FC<AgreementCardProps> = ({
  commitment,
  status,
  title,
  creator,
  views,
  comments,
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
              Agreement
            </Badge>
            <Badge isLoading={isLoading} variant="actionOutline">
              Recurring
            </Badge>
            <Badge isLoading={isLoading} variant="actionOutline">
              {commitment}%
            </Badge>
            <StatusBadge status={status} isLoading={isLoading} />
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
        <div className="flex flex-grow gap-2 text-xs text-gray-500 items-end justify-end h-full">
          {isLoading ? (
            <Skeleton width={16} height={16} />
          ) : (
            <div className="flex">
              <EyeOpenIcon className="mr-1" width={16} />
              <div>{views}</div>
            </div>
          )}
          {isLoading ? (
            <Skeleton width={16} height={16} />
          ) : (
            <div className="flex ml-3">
              <ChatBubbleIcon className="mr-1" width={16} />
              <div>{comments}</div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
