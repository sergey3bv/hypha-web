import { FC } from 'react';
import { MemberCard } from './member-card';
import { useMembers } from '../../hooks/use-members';

type MembersListProps = {
  page: number;
  activeFilter: string;
  isLoadingProp?: boolean;
  minimize?: boolean;
};

export const MembersList: FC<MembersListProps> = ({
  page,
  activeFilter,
  isLoadingProp,
  minimize,
}) => {
  const { members, isLoading } = useMembers({
    page,
    ...(activeFilter !== 'all' && { filter: { status: activeFilter } }),
  });
  return (
    <div className="member-list w-full">
      {members.map((member, index) => (
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
