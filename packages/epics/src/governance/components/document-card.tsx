import { type Document } from '@hypha-platform/core';
import { Card } from '@hypha-platform/ui';

interface DocumentCardProps {
  isLoading: boolean;
}

export const DocumentCard: React.FC<DocumentCardProps & Document> = ({
  isLoading,
  id,
  creatorId,
  title,
  description,
  slug,
  state,
  createdAt,
  updatedAt,
}) => {
  return <Card></Card>;
};
