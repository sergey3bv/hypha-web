import { Text } from '@radix-ui/themes';
import { Skeleton } from '@hypha-platform/ui';
import { PersonAvatar } from '../../people/components/person-avatar';

export type CreatorType = {
  avatar?: string;
  name?: string;
  surname?: string;
};

export type DiscussionHeadProps = {
  creator?: CreatorType;
  title?: string;
  isLoading: boolean;
};

export const DiscussionHead = ({
  creator,
  title,
  isLoading,
}: DiscussionHeadProps) => {
  return (
    <div className="flex flex-col">
      <Skeleton height="16px" width="200px" loading={isLoading}>
        <Text className="text-4 text-primary">{title}</Text>
      </Skeleton>
      <div className="flex row items-center">
        <Skeleton
          width="12px"
          height="12px"
          loading={isLoading}
          className="rounded-lg mr-2"
        >
          <PersonAvatar
            className="min-w-[12px] min-h-[12px] max-h-[12px] max-w-[12px] mr-2"
            avatarSrc={creator?.avatar}
            userName={`${creator?.name} ${creator?.surname}`}
          />
        </Skeleton>
        <Skeleton height="16px" width="80px" loading={isLoading}>
          <Text className="text-1 text-gray-500">
            {creator?.name} {creator?.surname}
          </Text>
        </Skeleton>
      </div>
    </div>
  );
};
