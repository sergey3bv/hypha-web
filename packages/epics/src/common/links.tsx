import { cn } from '@hypha-platform/lib/utils';
import { Input } from '@hypha-platform/ui';
import React from 'react';
import { LinkIcon } from './link-icon';

type LinksProps = {
  links: string[];
  onChange: (value: string[]) => void;
};

export const Links = ({ links, onChange }: LinksProps) => {
  const handleChange = React.useCallback(
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const newLinks = [...links];
      newLinks[index] = event.target.value;
      onChange(newLinks);
    },
    [links, onChange],
  );

  return (
    <div className="flex gap-2 flex-col">
      {links.map((link, index) => (
        <div
          key={index}
          className={cn(
            'flex justify-between items-center',
            !link && 'opacity-50',
          )}
        >
          <LinkIcon url={link} />
          <span className="flex items-center flex-1 ml-4">
            <Input
              placeholder="Add your URL"
              className={cn('text-2')}
              value={link}
              onChange={handleChange(index)}
            />
          </span>
        </div>
      ))}
    </div>
  );
};
