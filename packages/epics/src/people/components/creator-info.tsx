import { Skeleton } from '@hypha-platform/ui';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { Text } from '@radix-ui/themes';

export interface Creator {
  name: string;
  surname: string;
  avatarUrl: string;
}

interface CreatorInfoProps {
  creator: Creator;
  isLoading: boolean;
}

export const CreatorInfo = ({ isLoading, creator }: CreatorInfoProps) => {
  return (
    <div className="mt-2 flex items-center">
      <Skeleton
        width="24px"
        height="24px"
        className="rounded-md"
        loading={isLoading}
      >
        <Avatar>
          <AvatarImage
            className="rounded-md"
            width={24}
            height={24}
            src={creator?.avatarUrl}
            alt="logo"
          />
        </Avatar>
      </Skeleton>
      <Skeleton width="50px" height="16px" className="ml-2" loading={isLoading}>
        <Text className="ml-2 text-1 text-neutral-11">
          {creator?.name} {creator?.surname}
        </Text>
      </Skeleton>
    </div>
  );
};
