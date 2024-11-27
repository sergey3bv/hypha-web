import { Text } from '@radix-ui/themes';
import { Card, Badge } from '@hypha-platform/ui';
import Image from 'next/image';
import { CalendarIcon } from '@radix-ui/react-icons';
import { formatCurrencyValue } from '@hypha-platform/ui-utils';

type CardRequestProps = {
  name: string;
  surname: string;
  avatar: string;
  value: number;
  symbol: string;
  date: string;
};

export const CardRequest: React.FC<CardRequestProps> = ({
  name,
  surname,
  avatar,
  value,
  symbol,
  date
}) => {
  const formatDate = (dateString:string):string => {
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];
      const dateParts = dateString.split('/');
      const year = dateParts[0];
      const monthIndex = parseInt(dateParts[1]) - 1;
      const day = dateParts[2];
      return `${months[monthIndex]} ${day}, ${year}`;
  }
  return (
    <Card className='w-full h-full p-6 mb-2 flex'>
      <Image className='rounded-lg mr-3' src={avatar} height={64} width={64} alt={name}></Image>
      <div className='flex justify-between items-center w-full'>
        <div className='flex flex-col'>
          <div className='flex gap-x-1'>
            <Badge variant="actionOutline">{symbol}</Badge>
            <Badge variant="warning">Pending</Badge>
          </div>
          <Text className='text-3'>$ {formatCurrencyValue(value)}</Text>
          <Text className='text-xs text-gray-500'>{name} {surname}</Text>
        </div>
        <div className='flex h-full justify-end items-end text-gray-500'>
          <CalendarIcon className='mr-1'/>
          <Text className='text-xs'>{formatDate(date)}</Text>
        </div>
      </div>
    </Card>
  )
}

