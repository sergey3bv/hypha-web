import { FC } from 'react';
import { RequestCard } from './request-card';
import { useRequests } from '../../hooks/use-requests';
import { SortParams } from '@hypha-platform/graphql/rsc';

type RequestsListProps = {
  page: number;
  activeSort: SortParams['sort'];
};

export const RequestsList: FC<RequestsListProps> = ({ page, activeSort }) => {
  const { requests, isLoading } = useRequests({
    page,
    sort: { sort: activeSort },
  });
  return (
    <div className="w-full">
      <div className="w-full grid grid-cols-1 gap-2 mt-2">
        {requests.map((request, index) => (
          <RequestCard key={index} {...request} isLoading={isLoading} />
        ))}
      </div>
      <div>
        {isLoading ? (
          <div className="w-full grid grid-cols-1 gap-2 mt-2">
            <RequestCard isLoading={isLoading} />
            <RequestCard isLoading={isLoading} />
            <RequestCard isLoading={isLoading} />
            <RequestCard isLoading={isLoading} />
          </div>
        ) : null}
      </div>
    </div>
  );
};
