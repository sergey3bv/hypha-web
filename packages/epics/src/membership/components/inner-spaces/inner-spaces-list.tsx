import { FC } from 'react';
import { InnerSpaceCard } from './inner-space-card';
import { useInnerSpaces } from '../../hooks/use-inner-spaces';
import { SortParams } from '@hypha-platform/graphql/rsc';

type InnerSpacesListProps = {
  page: number;
  activeSort?: SortParams['sort'];
};

export const InnerSpacesList: FC<InnerSpacesListProps> = ({
  page,
  activeSort,
}) => {
  const { innerSpaces, isLoading } = useInnerSpaces({
    page,
    sort: { sort: activeSort },
  });
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2">
        {innerSpaces.map((innerSpace, index) => (
          <InnerSpaceCard key={index} {...innerSpace} isLoading={isLoading} />
        ))}
      </div>
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2">
          <InnerSpaceCard isLoading={isLoading} />
          <InnerSpaceCard isLoading={isLoading} />
          <InnerSpaceCard isLoading={isLoading} />
        </div>
      ) : null}
    </div>
  );
};
