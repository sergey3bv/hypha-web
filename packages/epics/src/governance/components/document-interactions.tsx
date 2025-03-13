import { DocumentStats } from './document-stats';

interface DocumentInteractionsProps {
  state?: string;
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
  return (
    <DocumentStats isLoading={isLoading} comments={comments} views={views} />
  );
};
