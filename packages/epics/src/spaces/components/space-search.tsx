'use client';
import { Input, Button } from '@hypha-platform/ui';
import { SearchIcon } from 'lucide-react';

type Suggestion = {
  title: string;
};

type SpaceSearchProps = {
  suggestions?: Suggestion[];
};

export const SpaceSearch = ({ suggestions }: SpaceSearchProps) => {
  return (
    <div className="flex flex-col flex-grow gap-2">
      <Input
        placeholder="Search the DAO..."
        leftIcon={<SearchIcon size="16px" />}
      />
      {suggestions && (
        <div className="flex items-center justify-center w-full gap-2">
          {suggestions.map((suggestion) => (
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
      )}
    </div>
  );
};
