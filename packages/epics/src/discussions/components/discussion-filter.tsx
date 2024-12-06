import { FC } from 'react';
import { FilterMenu, Button } from '@hypha-platform/ui';
import { Text } from '@radix-ui/themes';
import { PlusIcon } from '@radix-ui/react-icons';

type DiscussionFilterProps = {
  value: string;
  onChange: (value: string) => void;
  count: number;
};

export const DiscussionFilter: FC<DiscussionFilterProps> = ({
  value,
  onChange,
  count,
}) => {
  const filterOptions = [
    { label: 'All', value: 'all' },
    { label: 'Most recent', value: 'most-recent' },
  ];

  return (
    <div className="flex justify-between items-center mt-6 w-full">
      <Text className="text-lg">Discussions | {count}</Text>
      <div className="flex items-center">
        <FilterMenu value={value} onChange={onChange} options={filterOptions} />
        <Button className="ml-2" variant="action" size="sm">
          <PlusIcon className="mr-2" />
          Create
        </Button>
      </div>
    </div>
  );
};
