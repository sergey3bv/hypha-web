import { FC } from 'react';
import { useMembers } from '../../hooks/use-members';
import { MembersList } from './members-list';

type ConnectedMembersListProps = {
  page: number;
  activeFilter: string;
};

export const ConnectedMembersList: FC<ConnectedMembersListProps> = ({
  page,
  activeFilter,
}) => {
  const { members, isLoading } = useMembers({
    page,
    ...(activeFilter !== 'all' && { filter: { status: activeFilter } }),
  });
  return <MembersList members={members} isLoading={isLoading} />;
};
