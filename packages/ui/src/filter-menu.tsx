'use client';

import { useState } from 'react';
import { SelectMenu, SelectItem } from '@hypha-platform/ui/server';

type FilterMenuProps = {
  value: string;
  onChange?: (value: string) => void;
  options: { label: string; value: string }[];
};

export const FilterMenu = ({ value, onChange, options }: FilterMenuProps) => {
  const [selectedOption, setSelectedOption] = useState(value);

  const handleFilterChange = (newValue: string) => {
    setSelectedOption(newValue);

    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <SelectMenu
      variant="ghost"
      value={selectedOption}
      onValueChange={handleFilterChange}
    >
      {options.map((opt) => (
        <SelectItem key={opt.value} value={opt.value}>
          {opt.label}
        </SelectItem>
      ))}
    </SelectMenu>
  );
};
