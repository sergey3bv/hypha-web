import { Skeleton, Image, Badge } from '@hypha-platform/ui';
import { Amount } from '@hypha-platform/ui/server';
import { Text } from '@radix-ui/themes';

export type RequestFormHeadProps = {
  isLoading?: boolean;
  name?: string;
  surname?: string;
  avatar?: string;
  value?: number;
  symbol?: string;
};

export const RequestFormHead: React.FC<RequestFormHeadProps> = ({
  isLoading,
  name,
  surname,
  avatar,
  value,
  symbol,
}) => {
  return (
    <div className="flex">
      <Skeleton
        loading={isLoading}
        width="64px"
        height="64px"
        className="rounded-lg mr-3"
      >
        <Image
          className="rounded-lg mr-3"
          src={avatar ?? ''}
          height={64}
          width={64}
          alt={name ?? ''}
        />
      </Skeleton>
      <div className="flex justify-between items-center w-full">
        <div className="flex flex-col">
          <div className="flex gap-x-1">
            <Badge
              isLoading={isLoading}
              variant="surface"
              colorVariant="accent"
            >
              {symbol}
            </Badge>
            <Badge isLoading={isLoading} variant="surface" colorVariant="warn">
              Pending
            </Badge>
          </div>
          <Amount isLoading={isLoading} value={value ?? 0} withUsdSymbol />
          <Skeleton
            className="mt-2"
            loading={isLoading}
            width="80px"
            height="16px"
          >
            <Text className="text-1 text-gray-500">
              {name} {surname}
            </Text>
          </Skeleton>
        </div>
      </div>
    </div>
  );
};
