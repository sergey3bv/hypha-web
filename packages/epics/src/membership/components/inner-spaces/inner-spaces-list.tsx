import { FC } from 'react';
import { InnerSpaceCard } from './inner-space-card';
import { useSpaces } from '../../hooks/use-spaces';
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
  const { spaces, isLoading } = useSpaces({
    page,
    sort: { sort: activeSort },
  });
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2">
        {spaces.map((space, index) => (
          <Link href={`${basePath}/${space.slug}`} key={index} scroll={false}>
            <InnerSpaceCard {...space} isLoading={isLoading} />
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
