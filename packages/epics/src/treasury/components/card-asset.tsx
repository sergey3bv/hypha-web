'use client';

import { Text } from '@radix-ui/themes';
import { Card } from '@hypha-platform/ui';
import Image from 'next/image';

type AssetCardProps = {
  icon: string;
  name: string;
  symbol: string;
  value: number;
  usdEqual: number;
  type:  string;
};

export const CardAsset: React.FC<AssetCardProps> = ({
  icon,
  name,
  symbol,
  value,
  usdEqual,
}) => {
  const formatValue = (num:number):string => {
    const numStr = num.toString();
    const [integerPart, decimalPart] = numStr.split('.');
    const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return decimalPart ? `${formattedIntegerPart},${decimalPart}` : formattedIntegerPart;
  }
  return (
    <Card className='w-full h-full p-6 mb-2 flex flex-col justify-between'>
      <div className='w-full flex flex-row items-center'>
        <div className='mr-5'>
          <Image src={icon} height={40} width={40} alt={name}></Image>
        </div>
        <div className='flex flex-col justify-center'>
          <Text className='text-lg font-medium text-secondary-foreground'>{name}</Text>
          <Text className='text-xs text-gray-500'>{symbol}</Text>
        </div>
      </div>
      <div className='w-full flex flex-row'>
          <Text className='text-secondary-foreground font-bold text-xs'>$ {formatValue(usdEqual)}</Text>
          <Text className='text-gray-500 text-xs ml-1'>{formatValue(value)} {symbol}</Text>
      </div>
    </Card>
  )
}

