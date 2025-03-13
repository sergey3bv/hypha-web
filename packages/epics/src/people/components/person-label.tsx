import { Skeleton } from '@hypha-platform/ui';
import { Text } from '@radix-ui/themes';
import { PersonAvatar } from './person-avatar';

export interface Creator {
  name: string;
  surname: string;
  avatarUrl: string;
}

interface PersonLabelProps {
  creator?: Creator;
  isLoading: boolean;
  hasAvatar?: boolean;
}

export const PersonLabel = ({
  isLoading,
  creator,
  hasAvatar = true,
}: PersonLabelProps) => {
  return (
    <div className="mt-2 flex items-center">
      {hasAvatar ? (
        <PersonAvatar
          isLoading={isLoading}
          size="sm"
          avatarSrc={creator?.avatarUrl}
          userName={`${creator?.name} ${creator?.surname}`}
        />
      ) : null}

      <Skeleton width="50px" height="16px" className="ml-2" loading={isLoading}>
        <Text className="ml-2 text-1 text-neutral-11">
          {creator?.name} {creator?.surname}
        </Text>
      </Skeleton>
    </div>
  );
};
