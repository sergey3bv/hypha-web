import { DocumentStats } from './document-stats';

interface DocumentInteractionsProps {
  state?: string;
  isLoading?: boolean;
}

export const DocumentInteractions = ({
  state,
  isLoading,
}: DocumentInteractionsProps) => {
  return <DocumentStats isLoading={isLoading} comments={0} views={0} />;
};
