import { Text } from '@radix-ui/themes';
import { Card, Skeleton, BadgesList } from '@hypha-platform/ui';
import { CalendarIcon } from '@radix-ui/react-icons';
import { formatDate } from '@hypha-platform/ui-utils';
import { Amount } from '@hypha-platform/ui/server';
import { PersonAvatar } from '../../../people/components/person-avatar';

type PayoutCardProps = {
  name?: string;
  surname?: string;
  avatar?: string;
  value?: number;
  symbol?: string;
  date?: string;
  status?: string;
  isLoading?: boolean;
};

export const PayoutCard: React.FC<PayoutCardProps> = ({
  name,
  surname,
  avatar,
  value,
  symbol,
  date,
  status,
  isLoading,
}) => {
  return (
    <Card className="w-full h-full p-5 mb-2 flex">
      <PersonAvatar
        className="mr-3"
        size="lg"
        isLoading={isLoading}
        avatarSrc={avatar}
        userName={`${name} ${surname}`}
      />
      <div className="flex justify-between items-center w-full">
        <div className="flex flex-col">
          <BadgesList
            badges={[
              {
                label: symbol ?? '',
                variant: 'surface',
                colorVariant: 'accent',
              },
              {
                label: status === 'completed' ? 'Completed' : 'Rejected',
                variant: status === 'completed' ? 'surface' : 'surface',
                colorVariant: status === 'completed' ? 'success' : 'error',
              },
            ]}
            isLoading={isLoading}
          />
          <Amount isLoading={isLoading} value={value} withUsdSymbol />
          <Skeleton
            height="26px"
            width="160px"
            loading={isLoading}
            className="my-1"
          >
            <Text className="text-1 text-gray-500">
              {name} {surname}
            </Text>
          </Skeleton>
        </div>
        <Skeleton width="96px" height="16px" loading={isLoading}>
          <div className="flex h-full justify-end items-end text-gray-500">
            <CalendarIcon className="mr-1" />
            <Text className="text-1">{date ? formatDate(date) : null}</Text>
          </div>
        </Skeleton>
      </div>
    </Card>
  );
};
