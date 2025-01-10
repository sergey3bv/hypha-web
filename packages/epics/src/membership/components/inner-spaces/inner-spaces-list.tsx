import { FC } from 'react';
import { InnerSpaceCard } from './inner-space-card';
import { useInnerSpaces } from '../../hooks/use-inner-spaces';
import { SortParams } from '@hypha-platform/graphql/rsc';
import Link from 'next/link';

type InnerSpacesListProps = {
  page: number;
  activeSort?: SortParams['sort'];
  basePath: string;
};

export const InnerSpacesList: FC<InnerSpacesListProps> = ({
  page,
  activeSort,
  basePath,
}) => {
  const { innerSpaces, isLoading } = useInnerSpaces({
    page,
    sort: { sort: activeSort },
  });
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2">
        {innerSpaces.map((innerSpace, index) => (
          <Link href={`${basePath}/${innerSpace.slug}`} key={index}>
            <InnerSpaceCard {...innerSpace} isLoading={isLoading} />
          </Link>
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
