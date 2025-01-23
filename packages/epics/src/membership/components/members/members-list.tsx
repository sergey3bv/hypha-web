import { FC } from 'react';
import { MemberCard } from './member-card';
import { useMembers } from '../../hooks/use-members';
import Link from 'next/link';

type MembersListProps = {
  page: number;
  activeFilter: string;
  isLoadingProp?: boolean;
  minimize?: boolean;
  basePath?: string;
};

export const MembersList: FC<MembersListProps> = ({
  page,
  activeFilter,
  isLoadingProp,
  minimize,
  basePath,
}) => {
  const { members, isLoading } = useMembers({
    page,
    ...(activeFilter !== 'all' && { filter: { status: activeFilter } }),
  });
  return (
    <div className="member-list w-full">
      {members.map((member) => (
        <Link
          href={`${basePath}/${member.slug}`}
          key={member.slug}
          scroll={false}
        >
          <MemberCard minimize={minimize} {...member} isLoading={isLoading} />
        </Link>
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
