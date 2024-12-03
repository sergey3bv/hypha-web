import { Text } from '@radix-ui/themes';
import { Button, FilterMenu } from '@hypha-platform/ui';
import { CardPayout } from './card-payout';
import { formatCurrencyValue } from '@hypha-platform/ui-utils';
import {
  Tabs,
  TabsContent,
  TabsTrigger,
  TabsList,
} from '@hypha-platform/ui/server';

type PayoutItem = {
  avatar: string;
  name: string;
  surname: string;
  value: number;
  symbol: string;
  date: string;
  status: string;
};

type ListPayoutsProps = {
  payouts: PayoutItem[];
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

const payoutsFilterSettings: FilterType = {
  value: 'most-recent',
  options: [
    { label: 'All', value: 'all' },
    { label: 'Most recent', value: 'most-recent' },
  ],
};

export const ListPayouts: React.FC<ListPayoutsProps> = ({
  payouts,
  totalValue,
  onLoadMore,
}) => {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mt-4">
        <Text className="text-lg">
          Payouts | $ {formatCurrencyValue(totalValue)}
        </Text>
        <div className="flex items-center">
          <FilterMenu
            value={payoutsFilterSettings.value}
            options={payoutsFilterSettings.options}
          />
        </div>
      </div>
      <TabsContent value="treasury">
        <Tabs defaultValue="all" className="mt-3">
          <TabsList>
            <TabsTrigger value="all" variant="outlined">
              All
            </TabsTrigger>
            <TabsTrigger value="completed" variant="outlined">
              Completed
            </TabsTrigger>
            <TabsTrigger value="rejected" variant="outlined">
              Rejected
            </TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <div className="my-6 flex items-center flex-col w-full">
              <div className="flex flex-col w-full">
                {payouts.map((payout) => (
                  <CardPayout
                    status={payout.status}
                    avatar={payout.avatar}
                    name={payout.name}
                    surname={payout.surname}
                    date={payout.date}
                    value={payout.value}
                    symbol={payout.symbol}
                  />
                ))}
              </div>
              <Button
                onClick={onLoadMore}
                className="rounded-lg w-fit mt-4"
                variant="outline"
                size="sm"
              >
                Load more payouts
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="completed">
            <div className="my-6 flex items-center flex-col w-full">
              <div className="flex flex-col w-full">
                {payouts
                  .filter((payout) => payout.status === 'completed')
                  .map((payout) => (
                    <CardPayout
                      status={payout.status}
                      avatar={payout.avatar}
                      name={payout.name}
                      surname={payout.surname}
                      date={payout.date}
                      value={payout.value}
                      symbol={payout.symbol}
                    />
                  ))}
              </div>
              <Button
                onClick={onLoadMore}
                className="rounded-lg w-fit mt-4"
                variant="outline"
                size="sm"
              >
                Load more payouts
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="rejected">
            <div className="my-6 flex items-center flex-col w-full">
              <div className="flex flex-col w-full">
                {payouts
                  .filter((payout) => payout.status === 'rejected')
                  .map((payout) => (
                    <CardPayout
                      status={payout.status}
                      avatar={payout.avatar}
                      name={payout.name}
                      surname={payout.surname}
                      date={payout.date}
                      value={payout.value}
                      symbol={payout.symbol}
                    />
                  ))}
              </div>
              <Button
                onClick={onLoadMore}
                className="rounded-lg w-fit mt-4"
                variant="outline"
                size="sm"
              >
                Load more payouts
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </TabsContent>
    </div>
  );
};
