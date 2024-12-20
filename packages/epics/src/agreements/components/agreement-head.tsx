import { Text } from '@radix-ui/themes';
import { BadgeCva, StatusBadge, Skeleton, Image } from '@hypha-platform/ui';

export type CreatorType = {
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
      <Skeleton
        width="64px"
        height="64px"
        loading={isLoading}
        className="rounded-lg mr-3"
      >
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
      </Skeleton>

      <div className="flex justify-between items-center w-full">
        <div className="flex flex-col">
          <div className="flex gap-x-1">
            <BadgeCva variant="solid" colorVariant="accent" isLoading={isLoading}>
              Agreement
            </BadgeCva>
            <BadgeCva variant="soft" colorVariant="accent" isLoading={isLoading}>
              Recurring
            </BadgeCva>
            <BadgeCva variant="soft" colorVariant="accent" isLoading={isLoading}>
              {commitment}%
            </BadgeCva>
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
