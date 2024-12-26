import { Skeleton } from '@hypha-platform/ui';
import { Image } from '@hypha-platform/ui';
import { Amount } from '@hypha-platform/ui/server';

type AssetHeadProps = {
  icon: string;
  isLoading?: boolean;
  name: string;
  symbol: string;
  value: number;
  usdEqual: number;
};

export const AssetHead: React.FC<AssetHeadProps> = ({
  icon,
  name,
  value,
  usdEqual,
  symbol,
  isLoading,
}) => {
  return (
    <div className="flex flex-row items-center">
      <div>
        <Skeleton
          width="64px"
          height="64px"
          loading={isLoading}
          className="rounded-full mr-3"
        >
          <Image
            src={icon ? icon : ''}
            height={64}
            width={64}
            alt={name ? name : ''}
          />
        </Skeleton>
      </div>
      <div className="flex flex-col ml-3">
        <Amount
          className="text-4 font-medium tracking-normal"
          isLoading={isLoading}
          value={usdEqual}
          withUsdSymbol
        />
        <Amount
          className="text-1"
          variant="ghost"
          size="xs"
          isLoading={isLoading}
          value={value}
        >
          {symbol}
        </Amount>
      </div>
    </div>
  );
};
