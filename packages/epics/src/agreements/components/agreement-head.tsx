import { Text } from '@radix-ui/themes';
import { Badge, StatusBadge, Skeleton } from '@hypha-platform/ui';
import { PersonAvatar } from '../../people/components/person-avatar';

type CreatorType = {
  avatar?: string;
  name?: string;
  surname?: string;
};

export type AgreementHeadProps = {
  creator?: CreatorType;
  title?: string;
  commitment?: number;
  status?: string;
  isLoading?: boolean;
};

export const AgreementHead = ({
  creator,
  title,
  commitment,
  status,
  isLoading,
}: AgreementHeadProps) => {
  return (
    <div className="flex items-center">
      <PersonAvatar
        className="mr-3"
        size="lg"
        isLoading={isLoading}
        avatarSrc={creator?.avatar}
        userName={`${creator?.name} ${creator?.surname}`}
      />

      <div className="flex justify-between items-center w-full">
        <div className="flex flex-col">
          <div className="flex gap-x-1">
            <Badge variant="solid" colorVariant="accent" isLoading={isLoading}>
              Agreement
            </Badge>
            <Badge variant="soft" colorVariant="accent" isLoading={isLoading}>
              Recurring
            </Badge>
            <Badge variant="soft" colorVariant="accent" isLoading={isLoading}>
              {commitment}%
            </Badge>
            <StatusBadge isLoading={isLoading} status={status} />
          </div>

          <Skeleton
            height="26px"
            width="160px"
            loading={isLoading}
            className="my-1"
          >
            <Text className="text-3">{title}</Text>
          </Skeleton>

          <Skeleton height="16px" width="80px" loading={isLoading}>
            <Text className="text-xs text-gray-500">
              {creator?.name} {creator?.surname}
            </Text>
          </Skeleton>
        </div>
      </div>
    </div>
  );
};
