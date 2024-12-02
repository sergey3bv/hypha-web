import { FC } from 'react';
import { Button } from '@hypha-platform/ui';

type ProposalLoadMoreProps = {
  onClick: () => void;
  label: string;
};

export const ProposalLoadMore: FC<ProposalLoadMoreProps> = ({ onClick, label }) => {
  return (
    <div className='w-full flex justify-center'>
      <Button onClick={onClick} className="rounded-lg w-fit mt-4" variant="outline" size="sm">
        {label}
      </Button>
    </div>
  );
};
