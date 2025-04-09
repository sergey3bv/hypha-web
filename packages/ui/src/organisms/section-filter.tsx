import { FC } from 'react';
import { FilterMenu } from '../filter-menu';
import { Text } from '@radix-ui/themes';
import { Input } from '@hypha-platform/ui';
import { SearchIcon } from 'lucide-react';

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
  hasSearch?: boolean;
};

export const SectionFilter: FC<SectionFilterProps> = ({
  value,
  onChange,
  count,
  label,
  sortOptions,
  children,
  hasSearch,
}) => {
  return (
    <div className="flex justify-between items-center w-full gap-4">
      <Text className="text-4 capitalize text-nowrap">
        {label} | {count}
      </Text>
      {hasSearch ? (
        <Input
          className="w-full"
          placeholder="Search documents"
          leftIcon={<SearchIcon size="16px" />}
        />
      ) : (
        <></>
      )}
      <div className="flex items-center text-nowrap">
        <FilterMenu value={value} onChange={onChange} options={sortOptions} />
        {children}
      </div>
    </div>
  );
};
