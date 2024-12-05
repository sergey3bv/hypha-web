import { FC } from 'react';
import { DiscussionCard } from './discussion-card';
import { DiscussionsLoadMore } from './discussions-load-more';

type Creator = {
  avatar?: string;
  name?: string;
  surname?: string;
};

type DiscussionItem = {
  creator?: Creator;
  image?: string;
  title?: string;
  description?: string;
  views?: number;
  comments?: number;
  isLoading?: boolean | undefined;
  status: string;
};

type DiscussionsListProps = {
  discussions: DiscussionItem[];
  onLoadMore: () => void;
  isLoading: boolean | undefined;
};

const DiscussionsList: FC<DiscussionsListProps> = ({
  discussions,
  onLoadMore,
  isLoading,
}) => {
  return (
    <div className="discussion-list w-full">
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-6">
          <DiscussionCard isLoading={isLoading} />
          <DiscussionCard isLoading={isLoading} />
          <DiscussionCard isLoading={isLoading} />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-6">
          {discussions.map((discussion, index) => (
            <DiscussionCard key={index} {...discussion} isLoading={isLoading} />
          ))}
        </div>
      )}
      <DiscussionsLoadMore onClick={onLoadMore} label="Load more discussions" />
    </div>
  );
};

export default DiscussionsList;
