import { FC } from 'react';
import { FilterMenu } from '@hypha-platform/ui';
import { Text } from '@radix-ui/themes';

export type FilterOption = {
  label: string;
  value: string;
};

type SectionFilterProps = {
  value: string;
  onChange: (value: string) => void;
  count: number | string;
  label: string;
  sortOptions: FilterOption[];
  children?: React.ReactNode;
};

export const SectionFilter: FC<SectionFilterProps> = ({
  value,
  onChange,
  count,
  label,
  sortOptions,
  children,
}) => {
  return (
    <div className="flex justify-between items-center mt-6 w-full">
      <Text className="text-lg">
        {label} | {count}
      </Text>
      <div className="flex items-center">
        <FilterMenu value={value} onChange={onChange} options={sortOptions} />
        {children}
      </div>
    </div>
  );
};
