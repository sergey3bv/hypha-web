import { Text } from '@radix-ui/themes';
import { Skeleton } from '@hypha-platform/ui';
import { PersonAvatar } from '../../people/components/person-avatar';
import {
  type Creator,
  PersonLabel,
} from '../../people/components/person-label';

export type DiscussionHeadProps = {
  creator?: Creator;
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
        <div className="mr-3">
          <PersonAvatar
            size="xs"
            isLoading={isLoading}
            avatarSrc={creator?.avatarUrl}
            userName={`${creator?.name} ${creator?.surname}`}
          />
        </div>
        <PersonLabel
          isLoading={isLoading}
          creator={creator}
          hasAvatar={false}
        />
      </div>
    </div>
  );
};
