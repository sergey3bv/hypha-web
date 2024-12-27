import { FC } from 'react';
import { MemberCard } from './member-card';
import { useMembers } from '../../hooks/use-members';
import { MemberCardProps } from './member-card';

type MembersListProps = {
  page: number;
  activeFilter: string;
  membersProp?: MemberCardProps[];
  isLoadingProp?: boolean;
  minimize?: boolean;
};

export const MembersList: FC<MembersListProps> = ({
  page,
  activeFilter,
  membersProp,
  isLoadingProp,
  minimize,
}) => {
  const { members, isLoading } = useMembers({
    page,
    ...(activeFilter !== 'all' && { filter: { status: activeFilter } }),
  });
  return (
    <div className="member-list w-full">
      {(membersProp ? membersProp : members).map((member, index) => (
        <MemberCard
          minimize={minimize}
          key={index}
          {...member}
          isLoading={isLoading}
        />
      ))}

      {(isLoading || isLoadingProp) && (
        <div>
          <MemberCard isLoading={isLoading} />
          <MemberCard isLoading={isLoading} />
          <MemberCard isLoading={isLoading} />
          <MemberCard isLoading={isLoading} />
        </div>
      )}
    </div>
  );
};
