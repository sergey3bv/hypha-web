import { DocumentListCard } from './document-list-card';
import { type BadgeItem } from '@hypha-platform/ui';
import { type Creator } from '../../people/components/person-label';
import Link from 'next/link';

interface Document {
  title?: string;
  description?: string;
  leadImage?: string;
  creator?: Creator;
  badges?: BadgeItem[];
  slug?: string;
  interactions?: React.ReactNode;
}

interface DocumentListProps {
  isLoading: boolean;
  basePath: string;
  documents: Document[];
}

export const DocumentList = ({
  isLoading = true,
  basePath,
  documents,
}: DocumentListProps) => {
  return (
    <div className="w-full space-y-2 flex flex-col">
      {documents.map((document) => (
        <Link
          href={`${basePath}/${document.slug}`}
          key={document.slug}
          scroll={false}
        >
          <DocumentListCard {...document} isLoading={isLoading} />
        </Link>
      ))}
    </div>
  );
};
