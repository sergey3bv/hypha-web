import { DocumentStats } from './document-stats';
import { DocumentVoteButton } from './document-vote-button';

export interface DocumentInteractionsProps {
  state?: 'agreement' | 'discussion' | 'proposal';
  isLoading?: boolean;
  comments?: number;
  views?: number;
}

export const DocumentInteractions = ({
  state,
  isLoading,
  comments,
  views,
}: DocumentInteractionsProps) => {
  if (state === 'agreement' || state === 'discussion') {
    return (
      <DocumentStats isLoading={isLoading} comments={comments} views={views} />
    );
  }

  if (state === 'proposal') {
    return <DocumentVoteButton isLoading={isLoading} voted={false} />;
  }
  return null;
};
