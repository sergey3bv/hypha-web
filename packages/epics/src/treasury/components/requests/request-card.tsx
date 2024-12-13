import { Text } from '@radix-ui/themes';
import { Card, Badge } from '@hypha-platform/ui';
import Image from 'next/image';
import { CalendarIcon } from '@radix-ui/react-icons';
import { formatCurrencyValue, formatDate } from '@hypha-platform/ui-utils';
import { Skeleton } from '@hypha-platform/ui';

type RequestCardProps = {
  name?: string;
  surname?: string;
  avatar?: string;
  value?: number;
  symbol?: string;
  date?: string;
  isLoading?: boolean;
};

export const RequestCard: React.FC<RequestCardProps> = ({
  name,
  surname,
  avatar,
  value,
  symbol,
  date,
  isLoading,
}) => {
  return (
    <Card className="w-full h-full p-6 mb-2 flex">
      <Skeleton
        loading={isLoading}
        width="64px"
        height="64px"
        className="rounded-lg mr-3"
      >
        <Image
          className="rounded-lg mr-3"
          src={avatar ? avatar : ''}
          height={64}
          width={64}
          alt={name ? name : ''}
        />
      </Skeleton>
      <div className="flex justify-between items-center w-full">
        <div className="flex flex-col">
          <div className="flex gap-x-1">
            <Badge isLoading={isLoading} variant="actionOutline">
              {symbol}
            </Badge>
            <Badge isLoading={isLoading} variant="warning">
              Pending
            </Badge>
          </div>
          <Skeleton
            height="26px"
            width="160px"
            loading={isLoading}
            className="my-1"
          >
            <Text className="text-3">
              $ {value ? formatCurrencyValue(value) : null}
            </Text>
          </Skeleton>
          <Skeleton loading={isLoading} width="80px" height="16px">
            <Text className="text-xs text-gray-500">
              {name} {surname}
            </Text>
          </Skeleton>
        </div>
        <Skeleton width="96px" height="16px" loading={isLoading}>
          <div className="flex h-full justify-end items-end text-gray-500">
            <CalendarIcon className="mr-1" />
            <Text className="text-xs">{date ? formatDate(date) : null}</Text>
          </div>
        </Skeleton>
      </div>
    </Card>
  );
};
