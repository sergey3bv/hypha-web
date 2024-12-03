import { FC } from 'react';
import { Skeleton } from '@hypha-platform/ui';
import { Card } from '@hypha-platform/ui';

type ProposalListSkeletonProps = Record<string,never>

const ProposalListSkeleton: FC<ProposalListSkeletonProps> = () => {
  const skeletonCount = 4;

  return (
    <div className="proposal-list w-full">
      {Array.from({ length: skeletonCount }).map((_, index) => (
        <Card key={index} className="proposal-card-skeleton w-full h-full p-6 mb-2 flex animate-pulse">
          <Skeleton className="rounded-lg mr-3" width={64} height={64} />

          <div className="flex justify-between items-center w-full">
            <div className="flex flex-col w-full">
              <div className="flex gap-x-2 gap-y-1 mb-2">
                <Skeleton width={50} height={16} />
                <Skeleton width={70} height={16} />
                <Skeleton width={30} height={16} />
                <Skeleton width={70} height={16} />
              </div>

              <Skeleton className="mb-2" width="60%" height={20} />
              
              <Skeleton width="40%" height={12} />
            </div>

            <div>
              <Skeleton width={100} height={30} />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ProposalListSkeleton;
