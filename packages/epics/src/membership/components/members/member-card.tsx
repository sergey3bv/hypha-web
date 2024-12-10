import { Text } from '@radix-ui/themes';
import { Card, Badge, StatusBadge, Skeleton } from '@hypha-platform/ui';
import Image from 'next/image';
import { SewingPinFilledIcon } from '@radix-ui/react-icons';

type MemberCardProps = {
  name?: string;
  surname?: string;
  nickname?: string;
  location?: string;
  avatar?: string;
  commitment?: number;
  status?: string;
  isLoading?: boolean;
};

export const MemberCard: React.FC<MemberCardProps> = ({
  name,
  surname,
  nickname,
  location,
  avatar,
  commitment,
  status,
  isLoading,
}) => {
  return (
    <Card className="w-full h-full p-6 mb-2 flex">
      {isLoading ? (
        <Skeleton width={64} height={64} className="rounded-lg mr-3" />
      ) : (
        <Image
          className="rounded-lg mr-3"
          src={avatar ?? ''}
          height={64}
          width={64}
          alt={nickname ?? ''}
        ></Image>
      )}
      <div className="flex justify-between items-center w-full">
        <div className="flex flex-col">
          <div className="flex gap-x-1">
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
            <Text className="text-3">
              {name} {surname}
            </Text>
          )}
          {isLoading ? (
            <Skeleton height={16} width={80} />
          ) : (
            <Text className="text-xs text-gray-500">@{nickname}</Text>
          )}
        </div>
        {isLoading ? (
          <Skeleton height={16} width={96} />
        ) : (
          <div className="flex h-full justify-end items-end text-gray-500">
            <SewingPinFilledIcon className="mr-1" />
            <Text className="text-xs">{location}</Text>
          </div>
        )}
      </div>
    </Card>
  );
};
