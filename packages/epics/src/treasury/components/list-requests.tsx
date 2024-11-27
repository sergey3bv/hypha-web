'use client';
import { useState } from 'react';
import { Text } from '@radix-ui/themes';
import { PlusIcon } from '@radix-ui/react-icons';
import { Button, FilterMenu } from '@hypha-platform/ui';
import { CardRequest } from './card-request';
import { formatCurrencyValue } from '@hypha-platform/ui-utils';
import { listRequestsData } from '@hypha-platform/ui-utils';

type ListRequestsProps = Record<string, never>;

type OptionType = {
  label: string,
  value: string
}

type FilterType = {
  value: string,
  options: OptionType[]
}

const requestsfilterSettings: FilterType = {
  value: 'most-recent',
  options: [
    { label: 'All', value: 'all' },
    { label: 'Most recent', value: 'most-recent' }
  ],
};

export const ListRequests: React.FC<ListRequestsProps> = () => {
  const [requests, setRequests] = useState(listRequestsData.requests);
  const loadMoreRequests = () => {
    const newRequests = [
      {
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?&w=64&h=64&dpr=2&q=70&crop=faces&fit=crop',
        name: 'Name',
        surname: 'Surname',
        value: 1950,
        symbol: 'BTC',
        date: '2024/09/23'
      },
      {
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?&w=64&h=64&dpr=2&q=70&crop=faces&fit=crop',
        name: 'Name',
        surname: 'Surname',
        value: 1950,
        symbol: 'BTC',
        date: '2024/09/23'
      },
    ];
    setRequests(prevRequests => [...prevRequests, ...newRequests]);
  }
  return (
    <div className='w-full'>
      <div className='flex justify-between items-center mt-4'>
        <Text className='text-lg'>Requests | $ {formatCurrencyValue(listRequestsData.totalValue)}</Text>
        <div className='flex items-center'>
          <FilterMenu
            value={requestsfilterSettings.value}
            options={requestsfilterSettings.options}
          />
          <Button className='ml-2' variant="action" size="sm">
            <PlusIcon className='mr-2'/>
            Payout Request
          </Button>
        </div>
      </div>
      <div className="my-6 flex items-center flex-col">
        <div className='flex flex-col w-full'>
          {requests.map((request) => (
            <CardRequest avatar={request.avatar} name={request.name} surname={request.surname} date={request.date} value={request.value} symbol={request.symbol}/>
          ))}
        </div>
        <Button onClick={loadMoreRequests} className="rounded-lg w-fit mt-4" variant="outline" size="sm">
          Load more requests
        </Button>
      </div>
    </div>
  )
}