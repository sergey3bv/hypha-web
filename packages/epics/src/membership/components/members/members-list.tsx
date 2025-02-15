import { FC } from 'react';
import { MemberCard, MemberCardProps } from './member-card';
import Link from 'next/link';

type Member = MemberCardProps & { slug: string };

type MembersListProps = {
  isLoading?: boolean;
  minimize?: boolean;
  basePath?: string;
  members: Member[];
};

export const MembersList: FC<MembersListProps> = ({
  isLoading,
  minimize,
  basePath,
  members,
}) => {
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
