import { FC } from 'react';
import { MemberCard } from './member-card';
import Link from 'next/link';
import { useMembers } from '../../hooks/types';

type MembersListProps = {
  page: number;
  minimize?: boolean;
  basePath: string;
  useMembers: useMembers;
};

export const MembersList: FC<MembersListProps> = ({
  page,
  minimize,
  basePath,
  useMembers,
}) => {
  const { members, isLoading } = useMembers({ page });
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

      {isLoading && (
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
