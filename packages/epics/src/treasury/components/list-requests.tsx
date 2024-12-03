import { Text } from '@radix-ui/themes';
import { PlusIcon } from '@radix-ui/react-icons';
import { Button, FilterMenu } from '@hypha-platform/ui';
import { CardRequest } from './card-request';
import { formatCurrencyValue } from '@hypha-platform/ui-utils';

type RequestItem = {
  avatar: string;
  name: string;
  surname: string;
  value: number;
  symbol: string;
  date: string;
};

type ListRequestsProps = {
  requests: RequestItem[];
  totalValue: number;
  onLoadMore: () => void;
};

type OptionType = {
  label: string;
  value: string;
};

type FilterType = {
  value: string;
  options: OptionType[];
};

const requestsfilterSettings: FilterType = {
  value: 'most-recent',
  options: [
    { label: 'All', value: 'all' },
    { label: 'Most recent', value: 'most-recent' },
  ],
};

export const ListRequests: React.FC<ListRequestsProps> = ({
  requests,
  totalValue,
  onLoadMore,
}) => {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mt-4">
        <Text className="text-lg">
          Requests | $ {formatCurrencyValue(totalValue)}
        </Text>
        <div className="flex items-center">
          <FilterMenu
            value={requestsfilterSettings.value}
            options={requestsfilterSettings.options}
          />
          <Button className="ml-2" variant="action" size="sm">
            <PlusIcon className="mr-2" />
            Payout Request
          </Button>
        </div>
      </div>
      <div className="my-6 flex items-center flex-col">
        <div className="flex flex-col w-full">
          {requests.map((request) => (
            <CardRequest
              avatar={request.avatar}
              name={request.name}
              surname={request.surname}
              date={request.date}
              value={request.value}
              symbol={request.symbol}
            />
          ))}
        </div>
        <Button
          onClick={onLoadMore}
          className="rounded-lg w-fit mt-4"
          variant="outline"
          size="sm"
        >
          Load more requests
        </Button>
      </div>
    </div>
  );
};
