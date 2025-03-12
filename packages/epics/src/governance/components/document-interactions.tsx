import { DocumentStats } from './document-stats';
import { DocumentState } from '@hypha-platform/core';

interface DocumentInteractionsProps {
  state?: DocumentState;
  isLoading?: boolean;
}

export const DocumentInteractions = ({
  state,
  isLoading,
}: DocumentInteractionsProps) => {
  return <DocumentStats isLoading={isLoading} comments={0} views={0} />;
};
