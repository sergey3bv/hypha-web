import { FC } from 'react';
import { ProposalCard } from './proposal-card';
import { ProposalLoadMore } from './proposals-load-more';

type ProposalItem = {
  title: string;
  creator: { avatar: string; name: string; surname: string };
  commitment: number;
  status: string;
};

type ProposalListProps = {
  proposals: ProposalItem[];
  onLoadMore: () => void;
};

const ProposalList: FC<ProposalListProps> = ({ proposals, onLoadMore }) => {
  return (
    <div className="proposal-list w-full">
      {proposals.map((proposal, index) => (
        <ProposalCard key={index} {...proposal} />
      ))}
    <ProposalLoadMore onClick={onLoadMore} label="Load more proposals"/>
    </div>
  );
};

export default ProposalList;
