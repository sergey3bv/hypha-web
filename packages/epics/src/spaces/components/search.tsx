'use client';
import { Input, Button } from '@hypha-platform/ui';
import { SearchIcon } from 'lucide-react';

type Suggestion = {
  title: string;
};

type SearchProps = {
  suggestions?: Suggestion[];
};

export const Search = ({ suggestions }: SearchProps) => {
  return (
    <div>
      <Input
        placeholder="Search the DAO..."
        leftIcon={<SearchIcon size="16px" />}
      />
      <div className="mt-2 flex items-center justify-center w-full gap-2">
        {suggestions?.map((suggestion) => (
          <Button
            key={suggestion.title}
            className="w-fit h-fit py-1"
            variant="outline"
            colorVariant="neutral"
          >
            {suggestion.title}
          </Button>
        ))}
      </div>
    </div>
  );
};
