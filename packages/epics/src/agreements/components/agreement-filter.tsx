import { FC } from 'react';
import { FilterMenu } from '@hypha-platform/ui';
import { Text } from '@radix-ui/themes';

type AgreementFilterProps = {
  value: string;
  onChange: (value: string) => void;
  count: number;
};

export const AgreementFilter: FC<AgreementFilterProps> = ({
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
      <Text className="text-lg">Agreements | {count}</Text>
      <div className="flex items-center">
        <FilterMenu value={value} onChange={onChange} options={filterOptions} />
      </div>
    </div>
  );
};
