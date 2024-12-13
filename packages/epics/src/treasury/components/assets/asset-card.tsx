import { Text } from '@radix-ui/themes';
import { Card, Skeleton } from '@hypha-platform/ui';
import Image from 'next/image';
import { formatCurrencyValue } from '@hypha-platform/ui-utils';

type AssetCardProps = {
  icon?: string;
  name?: string;
  symbol?: string;
  value?: number;
  usdEqual?: number;
  status?: string;
  isLoading?: boolean;
};

export const AssetCard: React.FC<AssetCardProps> = ({
  icon,
  name,
  symbol,
  value,
  usdEqual,
  isLoading,
}) => {
  return (
    <Card className="w-full h-full p-6 mb-2 flex flex-col justify-between">
      <div className="w-full flex flex-row items-center mb-2">
        <div className="mr-5">
          <Skeleton
            width="40px"
            height="40px"
            loading={isLoading}
            className="rounded-full"
          >
            <Image
              src={icon ? icon : ''}
              height={40}
              width={40}
              alt={name ? name : ''}
            ></Image>
          </Skeleton>
        </div>
        <div className="flex flex-col justify-center">
          <Skeleton
            width="80px"
            height="16px"
            loading={isLoading}
            className="mb-1"
          >
            <Text className="text-lg font-medium text-secondary-foreground">
              {name}
            </Text>
          </Skeleton>
          <Skeleton width="80px" height="16px" loading={isLoading}>
            <Text className="text-xs text-gray-500">{symbol}</Text>
          </Skeleton>
        </div>
      </div>
      <div className="w-full flex flex-row">
        <Skeleton
          width="80px"
          height="16px"
          loading={isLoading}
          className="mr-2"
        >
          <Text className="text-secondary-foreground font-bold text-xs">
            $ {usdEqual ? formatCurrencyValue(usdEqual) : null}
          </Text>
        </Skeleton>
        <Skeleton width="80px" height="16px" loading={isLoading}>
          <Text className="text-gray-500 text-xs ml-1">
            {value ? formatCurrencyValue(value) : null} {symbol}
          </Text>
        </Skeleton>
      </div>
    </Card>
  );
};
