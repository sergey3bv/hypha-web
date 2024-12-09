import { FC } from 'react';
import { FilterMenu, Button } from '@hypha-platform/ui';
import { PlusIcon } from '@radix-ui/react-icons';
import { Text } from '@radix-ui/themes';

type InnerSpacesFilterProps = {
  value: string;
  onChange: (value: string) => void;
  count: number;
};

export const InnerSpacesFilter: FC<InnerSpacesFilterProps> = ({
  value,
  onChange,
  count,
}) => {
  const sortOptions = [
    { label: 'All', value: 'all' },
    { label: 'Most recent', value: 'most-recent' },
  ];

  return (
    <div className="flex justify-between items-center mt-6 mb-4 w-full">
      <Text className="text-lg">Inner Spaces | {count}</Text>
      <div className="flex items-center">
        <FilterMenu value={value} onChange={onChange} options={sortOptions} />
        <Button className="ml-2" variant="action" size="sm">
          <PlusIcon className="mr-2" />
          Create
        </Button>
      </div>
    </div>
  );
};
