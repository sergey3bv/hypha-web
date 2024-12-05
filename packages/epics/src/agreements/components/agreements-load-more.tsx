import { FC } from 'react';
import { Button } from '@hypha-platform/ui';

type AgreementsLoadMoreProps = {
  onClick: () => void;
  children?: React.ReactNode;
};

export const AgreementsLoadMore: FC<AgreementsLoadMoreProps> = ({
  onClick,
  children
}) => {
  return (
    <div className="w-full flex justify-center mb-8">
      <Button
        onClick={onClick}
        className="rounded-lg w-fit mt-4"
        variant="outline"
        size="sm"
      >
        {children}
      </Button>
    </div>
  );
};
