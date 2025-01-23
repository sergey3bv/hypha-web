import { Skeleton, Image } from '@hypha-platform/ui';
import { MemberType } from '@hypha-platform/graphql/rsc';

export type SpaceType = {
  logo?: string;
  members?: MemberType[];
  title?: string;
  description?: string;
  projects?: number;
};

export type MemberSpacesProps = {
  spaces?: SpaceType[];
  isLoading?: boolean;
};

export const MemberSpaces = ({ spaces, isLoading }: MemberSpacesProps) => {
  return (
    <div className="flex justify-between items-center">
      {isLoading ? (
        <Skeleton
          width="60px"
          height="26px"
          loading={isLoading}
          className="rounded-lg"
        />
      ) : (
        <div className="text-4 mr-4">Spaces</div>
      )}
      {isLoading ? (
        <div className="flex flex-row gap-3 overflow-x-auto">
          <Skeleton
            width="40px"
            height="40px"
            loading={isLoading}
            className="rounded-full"
          />
          <Skeleton
            width="40px"
            height="40px"
            loading={isLoading}
            className="rounded-full"
          />
          <Skeleton
            width="40px"
            height="40px"
            loading={isLoading}
            className="rounded-full"
          />
        </div>
      ) : (
        <div className="flex flex-row gap-3 overflow-x-auto">
          {spaces?.map((space, index) => (
            <Image
              // TODO: space doesn't have id field yet
              key={index}
              className="rounded-full"
              width={40}
              height={40}
              src={space.logo ?? ''}
              alt={space.title ?? ''}
            />
          ))}
        </div>
      )}
    </div>
  );
};
