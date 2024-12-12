import { FC } from 'react';
import { OuterSpaceCard } from './outer-space-card';
import { useOuterSpaces } from '../../hooks/use-outer-spaces';
import { SortParams } from '@hypha-platform/graphql/rsc';

type OuterSpacesListProps = {
  page: number;
  activeSort: SortParams['sort'];
};

export const OuterSpacesList: FC<OuterSpacesListProps> = ({
  page,
  activeSort,
}) => {
  const { outerSpaces, isLoading } = useOuterSpaces({
    page,
    sort: { sort: activeSort },
  });
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
        {outerSpaces.map((outerSpace, index) => (
          <OuterSpaceCard key={index} {...outerSpace} isLoading={isLoading} />
        ))}
      </div>
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
          <OuterSpaceCard isLoading={isLoading} />
          <OuterSpaceCard isLoading={isLoading} />
        </div>
      ) : null}
    </div>
  );
};
