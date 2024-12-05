import { FC } from 'react';
import { Button } from '@hypha-platform/ui';

type DiscussionsLoadMoreProps = {
  onClick: () => void;
  label: string;
};

export const DiscussionsLoadMore: FC<DiscussionsLoadMoreProps> = ({
  onClick,
  label,
}) => {
  return (
    <div className="w-full flex justify-center mb-4 mt-2">
      <Button
        onClick={onClick}
        className="rounded-lg w-fit mt-4"
        variant="outline"
        size="sm"
      >
        {label}
      </Button>
    </div>
  );
};
