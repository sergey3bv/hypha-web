import { Text } from '@radix-ui/themes';
import { Badge, StatusBadge, Skeleton } from '@hypha-platform/ui';
import { PersonAvatar } from '../../people/components/person-avatar';
import {
  type Creator,
  PersonLabel,
} from '../../people/components/person-label';

export type AgreementHeadProps = {
  creator?: Creator;
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
    <div className="flex items-center space-x-3">
      <PersonAvatar
        size="lg"
        isLoading={isLoading}
        avatarSrc={creator?.avatarUrl}
        userName={`${creator?.name} ${creator?.surname}`}
      />
      <div className="flex justify-between items-center w-full">
        <div className="flex flex-col">
          <div className="flex gap-x-1">
            <Badge variant="solid" colorVariant="accent" isLoading={isLoading}>
              Agreement
            </Badge>
          </div>

          <Skeleton
            height="26px"
            width="160px"
            loading={isLoading}
            className="my-1"
          >
            <Text className="text-3">{title}</Text>
          </Skeleton>
          <PersonLabel
            isLoading={isLoading ?? false}
            creator={creator}
            hasAvatar={false}
          />
        </div>
      </div>
    </div>
  );
};
